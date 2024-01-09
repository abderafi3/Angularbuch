/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Book } from '../../shared/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookStoreService } from 'src/app/shared/book-store.service';
import { Observable } from 'rxjs';
import { IsbnPipe } from 'src/app/shared/isbn.pipe';
import { LoggedinOnlyDirective } from 'src/app/shared/loggedin-only.directive';
import { ConfirmDirective } from 'src/app/shared/confirm.directive';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    AsyncPipe,
    RouterLink,
    IsbnPipe,
    LoggedinOnlyDirective,
    ConfirmDirective,
  ],
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  constructor(
    private service: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const isbn = this.route.snapshot.paramMap.get('isbn')!;
    this.book$ = this.service.getSingle(isbn);
  }

  removeBook(isbn: string) {
    this.service.remove(isbn).subscribe(() => {
      this.router.navigateByUrl('/books');
    });
  }
}
