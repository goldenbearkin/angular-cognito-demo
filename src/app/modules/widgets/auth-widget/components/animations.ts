import { trigger, state, style, transition, animate, AnimationEntryMetadata } from '@angular/core';;

export class Animations {
  public static opacity: AnimationEntryMetadata = trigger('opacity', [
    state('false', style({ opacity: 1 })),
    state('true', style({ opacity: 0 })),
    transition('true <=> false', animate('300ms ease'))
  ]);

  public static swipeInOut: AnimationEntryMetadata = trigger('swipeInOut', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-100%)' }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}
