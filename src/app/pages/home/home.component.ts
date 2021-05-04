import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from '../../services/youtube.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private _youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this._youtubeService.getVideos().subscribe(
      (response) => {
        this.videos.push(...response);
        console.log(this.videos);
      }
    );
  }

  mostrarVideo(video: Video) {
    console.log(video);
    Swal.fire({
      html:`
        <h4>${video.title}</h4>
        <iframe 
          width="100%" height="315" 
          src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `,
      confirmButtonText:'Cerrar',
    })
  }

}


