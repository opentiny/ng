import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiScoreModule } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ScoreBasicComponent } from './ScoreBasicComponent';
import { ScoreLimittextComponent } from './ScoreLimittextComponent';
import { ScoreEventsComponent } from './ScoreEventsComponent';
import { ScorePaddingComponent } from './ScorePaddingComponent';

@NgModule({
  imports: [CommonModule, FormsModule, DemoLogModule, TiScoreModule, RouterModule.forChild(ScoreTestModule.ROUTES)],
  exports: [RouterModule],
  declarations: [ScoreBasicComponent, ScoreLimittextComponent, ScorePaddingComponent, ScoreEventsComponent]
})
export class ScoreTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiScoreComponent.html', label: 'Score' }];
  static readonly ROUTES: Routes = [
    { path: 'score/score-basic', component: ScoreBasicComponent },
    { path: 'score/score-limittext', component: ScoreLimittextComponent },
    { path: 'score/score-padding', component: ScorePaddingComponent },
    { path: 'score/score-events', component: ScoreEventsComponent }
  ];
}
