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
  public channelName: string;
  public videoTitle: string;
  public description: string;


  constructor(private youtubeSearchService: YoutubeSearchService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.youtubeSearchService.videoDetail.subscribe(
      data => {
        this.videoDetails = data;
        if (this.videoDetails.length !== 0) {
          this.videoUrl = this.videoDetails[0].id;
          this.channelName = this.videoDetails[0].channelTitle;
          this.videoTitle = this.videoDetails[0].title;
          this.description = this.videoDetails[0].description;
        }
      }
    );
    
    this.youtubeSearchService.videoUrl.subscribe(
       data => {
         if (data) {
          // console.log(data);
          this.videoUrl = data.videoId;
          this.channelName = data.snippets.channelTitle;
          this.videoTitle = data.snippets.title;
          this.description = data.snippets.description;
        }
       }
    );
  }

  cleanUrl() {
    if (this.videoDetails.length !== 0) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(API_ENDPOINTS.YT_EMBED + this.videoUrl);
    }
  }  
}
