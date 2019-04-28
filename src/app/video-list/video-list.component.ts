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
          this.searchRelatedVideos(this.videoDetails[0].id);
        }
    });
  }

  searchRelatedVideos(videoId) {
    this.youtubeSearchService.searchRelatedVideos(videoId).subscribe(
      response => {
        this.relatedVideos = response.body;
    });
  }

  playVideo(videoDetail) {
    // console.log(videoDetail.id.videoId);
    // console.log(videoDetail.snippet);
    const videoInfo = 
      {
        videoId: videoDetail.id.videoId,
        snippets: videoDetail.snippet,
      }
      this.youtubeSearchService.sendVideo(videoInfo);
      this.searchRelatedVideos(videoInfo.videoId);
  }

}
