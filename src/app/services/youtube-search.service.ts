import { API_ENDPOINTS } from './../constants/api-endpoints';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, BehaviorSubject } from 'rxjs';
import { VideoDetail } from '../models/video-detail.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {
  private videoDetails: BehaviorSubject<VideoDetail[]> = new BehaviorSubject<VideoDetail[]>([]);
  videoDetail = this.videoDetails.asObservable();

  private videoUrls: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  videoUrl = this.videoUrls.asObservable();

  constructor(private httpClient: HttpClient) { }

  search(query: string): Observable<VideoDetail[]> {
    const params: string = [
      `q=${query}`,
      `key=${API_ENDPOINTS.YT_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=1`
    ].join('&');

    const queryUrl = `${API_ENDPOINTS.YT_SEARCH}?${params}`;

    return this.httpClient.get(queryUrl).pipe(map(response => {
      return response['items'].map(item => {
        return new VideoDetail({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          channelId: item.id.channelId,
        });
      });
    }));
  }

  searchRelatedVideos(queryId: string) {
    const params: string = [
      `relatedToVideoId=${queryId}`,
      `key=${API_ENDPOINTS.YT_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=25`
    ].join('&');
    
    const queryUrl = `${API_ENDPOINTS.YT_SEARCH}?${params}`;

    return this.httpClient.get(queryUrl, { observe: 'response'});

    // TRIED LINKING OBSERVABLES, HAD NO TIME 
    
    // return this.httpClient.get(queryUrl).pipe(map(response => {
    //   return response['items'].map(item => {
    //     console.log('jesam tu');
    //     return new RelatedVideoDetail({
    //       id: item.id.videoId,
    //       title: item.snippet.title,
    //       description: item.snippet.description,
    //       thumbnailUrl: item.snippet.thumbnails.high.url,
    //     });
    //   });
    // }));
  }


  getVideoDetails(newVideoDetail) {
    this.videoDetails.next(newVideoDetail);
  }

  sendVideo(videoDetail) {
    this.videoUrls.next(videoDetail);
  }
}
