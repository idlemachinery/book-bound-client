import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MODALS } from '../../core/modals/modals.component';

import { AuthorEditComponent } from './author-edit.component';

@Injectable()
export class AuthorCanDeactivateGuard implements CanDeactivate<AuthorEditComponent> {

  constructor(private modal: NgbModal) {}

  canDeactivate(
    component: AuthorEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.isDirty) {
      return true;
    }
    // Dirty show display modal dialog to user to confirm leaving
    const options: NgbModalOptions = { centered: true };
    return this.modal.open(MODALS.loseChanges, options)
      .result.then(result => true, reason => false);
  }
}
