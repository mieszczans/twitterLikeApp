import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

export const showPosts = trigger('showPosts', [
  transition(':increment, :enter', [
    query(
      '.single-post',
      style({ transform: 'translateX(-100vw)', opacity: 0 }),
      { optional: true }
    ),
    query(
      '.single-post',
      stagger('1s', [
        animate(
          '1s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        )
      ]),
      { optional: true }
    )
  ])
]);
