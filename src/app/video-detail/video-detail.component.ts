import { YoutubeSearchService } from './../services/youtube-search.service';
import { Component, OnInit } from '@angular/core';
import { VideoDetail } from '../models/video-detail.model';
import { DomSanitizer } from '@angular/platform-browser';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  public videoDetails: VideoDetail[];
  public videoUrl = '';


  constructor(private youtubeSearchService: YoutubeSearchService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.youtubeSearchService.videoDetail.subscribe(
      data => {
        this.videoDetails = data;
        if (this.videoDetails.length !== 0) {
          this.videoUrl = this.videoDetails[0].id;
        }
      }
    );
    
    this.youtubeSearchService.videoUrl.subscribe(
       data => {
         // console.log(data);
         this.videoUrl = data;
         // this.cleanUrl(this.relatedUrl);
       }
    );
  }

  cleanUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(API_ENDPOINTS.YT_EMBED + this.videoUrl);
  }
  
}
