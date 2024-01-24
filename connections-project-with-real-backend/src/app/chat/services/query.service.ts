import { Injectable } from '@angular/core';
import { catchError, interval, map, switchMap, take } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../shared/components/toast messages/toast.service';
import { IGroupItem, IMessage, IUserItem } from '../chat.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface ITimers {
  groupTimer: number;

  peopleTimer: number;

  userConversationTimer: number;

  groupConversationTimer: number;
}

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  groups!: IGroupItem[];

  users!: IUserItem[];

  timers: ITimers = {
    groupTimer: 60,

    peopleTimer: 60,

    userConversationTimer: 60,

    groupConversationTimer: 60,
  };

  constructor(
    private api: ApiService,
    private toastService: ToastService,
    private router: Router
  ) {}

  clearAll() {
    this.groups = [];
    this.users = [];
  }

  goTimer(timer: keyof ITimers, key: string) {
    if (this.timers[timer] === 1) {
      this.timers[timer] = 60;
      localStorage.removeItem(`${key}Update`);
    } else {
      this.timers[timer] = this.timers[timer] - 1;
    }
  }

  startTimer(key: string) {
    const timer = `${key}Timer` as keyof ITimers;
    return interval(1000)
      .pipe(take(this.timers[timer]))
      .subscribe(() => {
        this.goTimer(timer, key);
      });
  }

  checkGroupList(groupId: string) {
    return this.api.getGroupList().pipe(
      map(groupList => {
        const existedGroup = groupList.Items.find(
          group => group.id.S === groupId
        );
        if (!existedGroup) {
          throw new Error('!! This group not existed !!');
        } else {
          return existedGroup.id.S;
        }
      }),
      catchError(error => {
        this.toastService.showDanger(
          error.message || '!! check internet connection !!'
        );
        throw new Error(error);
      })
    );
  }

  getGroups() {
    return this.api
      .getGroupList()
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          localStorage.removeItem('groupUpdate');
          throw new Error(error);
        })
      )
      .subscribe({
        next: groupList => {
          this.toastService.showSuccess(
            '!! group list has successfully loaded !!'
          );
          this.groups = groupList.Items;
          if (localStorage['groupUpdate']) {
            this.startTimer('group');
          }
        },
        error: err => console.log(err),
      });
  }

  createOwnGroup(groupName: string, modal: NgbActiveModal) {
    return this.api
      .createOwnGroup(groupName)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        })
      )
      .subscribe({
        next: groupId => {
          const myGroup: IGroupItem = {
            id: {
              S: groupId.groupID,
            },
            name: {
              S: groupName,
            },
            createdAt: {
              S: String(new Date()),
            },
            createdBy: {
              S: localStorage['uid'],
            },
            isMyGroup: true,
          };
          this.toastService.showSuccess(
            `!! your group ${groupName} has successfully created !!`
          );
          this.groups = [myGroup, ...this.groups];
          modal.dismiss('Cross click');
        },
        error: err => console.log(err),
      });
  }

  removeGroup(id: string, groupName: string) {
    return this.api
      .removeOwnGroup(id)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess(
            `!! your group ${groupName} has successfully removed !!`
          );
          this.groups = this.groups.filter(group => group.id.S !== id);
          localStorage.removeItem('groupConversationUpdate');
          this.router.navigate(['/chat']);
        },
        error: err => console.log(err),
      });
  }

  getUsers() {
    return this.api
      .getPeopleList()
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          localStorage.removeItem('peopleUpdate');
          throw new Error(error);
        })
      )
      .subscribe({
        next: userList => {
          this.toastService.showSuccess(
            '!! user list has successfully loaded !!'
          );
          this.users = userList.Items;
          if (localStorage['peopleUpdate']) {
            this.startTimer('people');
          }
        },
        error: err => console.log(err),
      });
  }

  openConversation(userId: string, userName: string) {
    return this.api
      .createConversation(userId)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        })
      )
      .subscribe({
        next: user => {
          this.users = this.users.map(customer =>
            customer.uid.S === userId
              ? {
                  ...customer,
                  conversationId: user.conversationID,
                }
              : customer
          );
          this.toastService.showSuccess(
            `!! conversation with ${userName} has successfully loaded !!`
          );
          this.router.navigate([`/conversation`, user.conversationID]);
        },
        error: err => console.log(err),
      });
  }

  deleteConversation(user: IUserItem) {
    return this.api
      .deleteConversation(user.conversationId as string)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess(
            `!! conversation with ${user.name.S} has successfully removed !!`
          );
          this.users = this.users.map(eachUser =>
            user.uid.S === eachUser.uid.S
              ? {
                  ...eachUser,
                  conversationId: undefined,
                }
              : eachUser
          );
          localStorage.removeItem('userConversationUpdate');
          this.router.navigate(['/chat']);
        },
        error: err => console.log(err),
      });
  }

  loadCompanion(companion: IUserItem) {
    let allExistedMessages = companion.messages;
    return this.api.updateChat(companion).pipe(
      map(allUpdatedMessages => {
        this.toastService.showSuccess(
          allUpdatedMessages.Items.length === 0
            ? '!! no new messages !!'
            : '!! messages have successfully updated !!'
        );
        this.users = this.users.map(eachUser => {
          if (companion.uid.S === eachUser.uid.S) {
            allExistedMessages = [
              ...(allExistedMessages || []),
              ...allUpdatedMessages.Items,
            ].sort((m1, m2) => +m1.createdAt.S - +m2.createdAt.S);
            companion.lastUnix =
              allExistedMessages.length === 0
                ? undefined
                : (allExistedMessages.at(-1) as IMessage).createdAt.S;
            return companion;
          } else {
            return eachUser;
          }
        });
        return { ...companion, messages: allExistedMessages };
      }),
      catchError(error => {
        this.toastService.showDanger(
          error.error.message || '!! check internet connection !!'
        );
        throw new Error(error);
      })
    );
  }

  sendMessage(companion: IUserItem, message: string, input: HTMLInputElement) {
    return this.api
      .sendMessage(companion.conversationId as string, message)
      .pipe(
        catchError(error => {
          this.toastService.showDanger(
            error.error.message || '!! check internet connection !!'
          );
          throw new Error(error);
        }),
        switchMap(() => {
          input.value = '';
          return this.loadCompanion(companion);
        })
      );
  }

  loadGroupMessages(group: IGroupItem) {
    let allExistedMessages = group.messages;
    return this.api.updateGroupChat(group).pipe(
      map(allUpdatedMessages => {
        this.toastService.showSuccess(
          allUpdatedMessages.Items.length === 0
            ? '!! no new messages !!'
            : '!! messages have successfully updated !!'
        );
        this.groups = this.groups.map(eachGroup => {
          if (group.id.S === eachGroup.id.S) {
            allExistedMessages = [
              ...(allExistedMessages || []),
              ...allUpdatedMessages.Items,
            ].sort((m1, m2) => +m1.createdAt.S - +m2.createdAt.S);
            group.lastUnix =
              allExistedMessages.length === 0
                ? undefined
                : (allExistedMessages.at(-1) as IMessage).createdAt.S;
            return { ...group, messages: allExistedMessages };
          } else {
            return eachGroup;
          }
        });
        return { ...group, messages: allExistedMessages };
      }),
      catchError(error => {
        this.toastService.showDanger(
          error.error.message || '!! check internet connection !!'
        );
        throw new Error(error);
      })
    );
  }

  sendGroupMessage(
    group: IGroupItem,
    message: string,
    input: HTMLInputElement
  ) {
    return this.api.sendGroupMessage(group.id.S, message).pipe(
      catchError(error => {
        this.toastService.showDanger(
          error.error.message || '!! check internet connection !!'
        );
        throw new Error(error);
      }),
      switchMap(() => {
        input.value = '';
        return this.loadGroupMessages(group);
      })
    );
  }
}
