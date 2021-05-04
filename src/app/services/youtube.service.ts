import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3/';
  private ApiKey = 'AIzaSyCBju6Y7XVrFPRp1o_YmBUjkExU9JKwgdE';
  private playList = 'UUbulh9WdLtEXiooRcYK7SWw';
  private nextPageToken = '';

  constructor(
    private _http: HttpClient
  ) {   }

  getVideos() {
    let url = `${this.youtubeUrl}\playlistItems`;
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '12')
      .set('playlistId', this.playList)
      .set('key', this.ApiKey)
      .set('pageToken', this.nextPageToken);

    return this._http.get<YoutubeResponse>(url, {params}).pipe(
      map(response => {
        this.nextPageToken = response.nextPageToken;
        return response.items
      }),
      map(items => items.map(video => video.snippet))
    );
  }
}
