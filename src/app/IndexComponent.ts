import { Component, Inject } from '@angular/core';
import { DemoModules } from './DemoModules';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
    template: `
    <style>
        table,table tr th, table tr td { border:1px solid #0094ff; }
        table { border-collapse: collapse; padding:2px;}
        a{ text-decoration:none;padding:4px 8px;}
        .demo-test-case-item {
           padding:8px;
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
        <tr>
            <th>API Doc</th>
            <th>Demo</th>
        </tr>
        <tr *ngFor="let module of allModules">
            <td>
                <ng-container *ngFor="let link of module.LINKS">
                    <a  href="javascript:void(0)">{{link.label}}</a>
                    <br>
                </ng-container>
            </td>
            <td class="demo-test-case-item">
                <ng-container *ngFor="let route of module.ROUTES">
                    <a  routerLink="/{{route.path}}" routerLinkActive="active" target="_blank">{{path2name(route.path)}}</a>
                </ng-container>
            </td>
        </tr>
    </table>`
})
export class IndexComponent {

    allModules: Array<any> = DemoModules.allModules;

    constructor(@Inject(DOCUMENT) private document) {
        // 设置网页标题
        this.document.getElementsByTagName('title')[0].innerText = 'Demo Index';
    }

    path2name(path:string): string{
        return path.split('\/').pop();
    }
}
