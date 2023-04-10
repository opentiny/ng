import { Component } from '@angular/core';
import { RadioTestModule } from './radio/RadioTestModule';

@Component({
  template: `<style>
      table,
      table tr th,
      table tr td {
        border: 1px solid #0094ff;
      }
      table {
        border-collapse: collapse;
        padding: 2px;
      }
      a {
        text-decoration: none;
        padding: 4px 8px;
      }
      .demo-test-case-item {
        padding: 8px;
      }
      .demo-test-case-item > a {
        display: inline-block;
        font-size: 14px;
      }
      .demo-test-case-item > a:hover {
        background-color: #eef0f5;
      }
    </style>
    <table border="1" cellspacing="0">
      <ng-container *ngFor="let routes of moudles">
        <tr>
          <th>{{ routes[0]?.path.split('/')[0] }} demo</th>
        </tr>
        <tr>
          <td class="demo-test-case-item">
            <ng-container *ngFor="let route of routes">
              <a routerLink="/{{ route.path }}" routerLinkActive="active" target="_blank">{{ path2name(route.path) }}</a>
            </ng-container>
          </td>
        </tr>
      </ng-container>
    </table>`
})
export class IndexComponent {
  moudles: Array<any> = [RadioTestModule.ROUTES];

  path2name(path: string): string {
    return path.split('/').pop();
  }
}
