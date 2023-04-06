import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TiTextModule, TiTextComponent } from '../../../../lib/src/TiTextModule';
import { TextBasicComponent } from './TextBasicComponent';
NamedNodeMap;
describe('text', () => {
  let testComponent: TextBasicComponent;
  let fixture: ComponentFixture<TextBasicComponent>;
  let testDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiTextModule, FormsModule],
      declarations: [TiTextComponent, TextBasicComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBasicComponent);
    testComponent = fixture.componentInstance;
    testDebugEl = fixture.debugElement.query(By.directive(TiTextComponent));
  });

  describe('text basic', () => {
    it('should component defined', () => {
      fixture.detectChanges();
      expect(testComponent).toBeDefined();
    });

    it('should id correct', () => {
      fixture.detectChanges();
      expect(testDebugEl.nativeElement!.getAttribute('id')).toEqual('text-basic');
    });

    it('should ngModel work', fakeAsync(() => {
      const testNativeEl = testDebugEl.nativeElement;
      fixture.detectChanges();
      tick();
      expect(testNativeEl.value).toEqual('长期艰苦奋斗');
      testNativeEl.value = 'My string';
      var event = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      testNativeEl.dispatchEvent(event);
      fixture.detectChanges();
      tick();
      expect(testNativeEl.value).toEqual('My string');
    }));
  });
});
