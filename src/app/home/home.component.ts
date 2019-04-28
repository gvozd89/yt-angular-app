import { YoutubeSearchService } from './../services/youtube-search.service';
import { Component, OnInit } from '@angular/core';
import { VideoDetail } from '../models/video-detail.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public videoDetails: VideoDetail[];

  constructor(private youtubeSearchService: YoutubeSearchService) { }

  ngOnInit() {
    this.youtubeSearchService.videoDetail.subscribe(
      data => {
        this.videoDetails = data;
        // console.log(this.videoDetails);
      }
    );
  }

}
