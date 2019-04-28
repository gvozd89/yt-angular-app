import { VideoDetail } from './../models/video-detail.model';
import { Component, OnInit } from '@angular/core';
import { YoutubeSearchService } from '../services/youtube-search.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  public videoDetails: VideoDetail[];
  public relatedVideos: any;

  constructor(private youtubeSearchService: YoutubeSearchService) { }

  ngOnInit() {
    this.youtubeSearchService.videoDetail.subscribe(
      data => {
        this.videoDetails = data;
        // console.log(this.videoDetails);
        if (this.videoDetails.length !== 0) {
          console.log('udjem li tu?!"#!"$&#%/(#$%(/');
          this.youtubeSearchService.searchRelatedVideos(this.videoDetails[0].id).subscribe(
            response => {
              this.relatedVideos = response.body
              console.log(this.relatedVideos);
          });
        }
    });
  }

  playVideo(videoId) {
    this.youtubeSearchService.sendVideoUrl(videoId);
  }

}
