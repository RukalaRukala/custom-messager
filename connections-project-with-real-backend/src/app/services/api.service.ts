import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ICredentials,
  IProfileResponse,
  ISignInResponse,
} from '../auth/auth.model';
import { environment as env } from '../../environment/environment';
import {
  IChatGroupList,
  ICompanion,
  IConversation,
  IConversations,
  IGroupId,
  IGroupItem,
  IMessages,
  IUserItem,
  IUsers,
} from '../chat/chat.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  signUp(credentials: ICredentials) {
    return this.http.post<Response>(env.regUrl, credentials);
  }

  signIn(credentials: ICredentials) {
    return this.http.post<ISignInResponse>(env.logUrl, credentials);
  }

  logout() {
    return this.http.delete<Response>(env.logoutUrl);
  }

  getCredentials() {
    return this.http.get<IProfileResponse>(env.profileUrl);
  }

  saveNewName(name: string) {
    return this.http.put(env.profileUrl, { name });
  }

  getGroupList() {
    return this.http.get<IChatGroupList>(env.groupListUrl);
  }

  createOwnGroup(groupName: string) {
    return this.http.post<IGroupId>(env.groupCreateUrl, { name: groupName });
  }

  removeOwnGroup(id: string) {
    const httpParams = new HttpParams().set('groupID', id);
    return this.http.delete<Response>(env.groupDeleteUrl, {
      params: httpParams,
    });
  }

  getPeopleList(): Observable<IUsers> {
    return this.http.get<IUsers>(env.usersUrl).pipe(
      switchMap(users => {
        return this.getConversations().pipe(
          map(conv => conv.Items),
          map(conversations => {
            return {
              ...users,
              Items: this.setExistedConversations(users.Items, conversations),
            };
          })
        );
      })
    );
  }

  createConversation(userId: string) {
    return this.http.post<ICompanion>(env.convCreateUrl, { companion: userId });
  }

  getConversations() {
    return this.http.get<IConversations>(env.convListUrl);
  }

  setExistedConversations(users: IUserItem[], convIds: IConversation[]) {
    const newUsers: IUserItem[] = [];

    users.forEach(user => {
      const conversation = convIds.find(
        conv => conv.companionID.S === user.uid.S
      );

      if (conversation) {
        newUsers.push({ ...user, conversationId: conversation.id.S });
      } else {
        newUsers.push(user);
      }
    });

    return newUsers;
  }

  deleteConversation(id: string) {
    return this.http.delete<Response>(env.convDeleteUrl, {
      params: { conversationID: id },
    });
  }

  // getAllMessages(conversationId: string) {
  //   return this.http.get<IMessages>(env.convReadUrl, {
  //     params: { conversationID: conversationId },
  //   });
  // }

  sendMessage(conversationId: string, message: string) {
    return this.http.post<Response>(env.convAppendUrl, {
      conversationID: conversationId,
      message: message,
    });
  }

  updateChat(companion: IUserItem) {
    const httpParams = new HttpParams()
      .set('conversationID', companion.conversationId as string)
      .set('since', companion.lastUnix ? +(companion.lastUnix as string) : 0);

    return this.http.get<IMessages>(env.convReadUrl, {
      params: httpParams,
    });
  }

  updateGroupChat(chosenGroup: IGroupItem) {
    const httpParams = new HttpParams()
      .set('groupID', chosenGroup.id.S as string)
      .set(
        'since',
        chosenGroup.lastUnix ? +(chosenGroup.lastUnix as string) : 0
      );

    return this.http.get<IMessages>(env.groupReadUrl, {
      params: httpParams,
    });
  }

  sendGroupMessage(groupId: string, message: string) {
    return this.http.post<Response>(env.groupAppendUrl, {
      groupID: groupId,
      message: message,
    });
  }
}
