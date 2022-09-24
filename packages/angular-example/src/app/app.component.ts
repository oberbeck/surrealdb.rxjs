import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SurrealNg, SURREAL_URL } from '@surrealdb.rxjs/angular';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  providers: [
    SurrealNg,
    {
      provide: SURREAL_URL,
      useValue: 'http://127.0.0.1:8000/rpc',
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-example';

  openCalled$ = this.surreal.on$('open').pipe(map(() => true));
  closeCalled$ = this.surreal.on$('close').pipe(map(() => true));

  constructor(private surreal: SurrealNg) {}

  async connectInteractionHandler() {
    // Signin as a namespace, database, or root user
    await this.surreal.signin({
      user: 'root',
      pass: 'root',
    });

    // Select a specific namespace / database
    await this.surreal.use('test', 'test');
  }

  async closeInteractionHandler() {
    await this.surreal.close();
  }
}
