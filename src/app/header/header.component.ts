import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

import { YoutubeSearchService } from '../services/youtube-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private youtubeSearchService: YoutubeSearchService,
              private elRef: ElementRef) { }

  ngOnInit() {
    fromEvent(this.elRef.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter(text => text.length > 1),
      debounceTime(500),
      map((query: string) => this.youtubeSearchService.search(query)),
      switchAll()
    ).subscribe(
      _results => {
        // console.log(_results);
        this.youtubeSearchService.getVideoDetails(_results);
        // this.youtubeSearchService.searchRelatedVideos(_results[0].id);
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

}
