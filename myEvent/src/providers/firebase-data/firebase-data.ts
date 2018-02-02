import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { UploadFile } from './file';
import { AuthenticationProvider } from '../authentication/authentication';



interface eventSave {
  $key?: string;
  uid: string;
  eventTitle: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStreet: string;
  eventPostcode: string;
  eventId: string;
  bookmarked: boolean;
  attending: boolean;
  publicProfile: boolean;
}


@Injectable()
export class FirebaseDataProvider {

  basePathusersData = 'users';
  basePath = 'uploads';
  basePathusers = 'user-uploads';
  basePathUsersProfiles = 'users-profile-pictures';

  basePatheventsSaved = 'savedEvents';
  basePathEventImage = 'eventImages';

  uploadsRef: AngularFireList<UploadFile>;
  uploads: Observable<UploadFile[]>;
  userData: Observable<any[]>;
  userEvents: Observable<any[]>;

  itemsRef: AngularFireList<eventSave>;



  constructor(public http: HttpClient,
     public auth:  AuthenticationProvider,
     private db: AngularFireDatabase)   { 

    // this.itemsRef = db.list(`savedEvents/${this.auth.currentUserId}`)
    this.itemsRef = db.list('/savedEvents')
    console.log(this.itemsRef)
  }

  getUserData(uid: string) {
    this.userData = this.db.list(this.basePathusersData, ref=> ref.orderByChild('uid').equalTo(uid)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.userData;
  }

  getAllUsersData() {
    this.userData = this.db.list(this.basePathusersData, ref=> ref.orderByChild('uid')).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.userData;
  }


  getEventsImages() {
    this.uploads = this.db.list(this.basePathEventImage, ref=> ref.orderByChild('id')).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  getEventAttendees(eventId: string) {
    this.userEvents = this.db.list(this.basePatheventsSaved, ref=> ref.orderByChild('eventId').equalTo(eventId)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.userEvents;
  }


  getUserEvents(uid: string) {
    this.userEvents = this.db.list(this.basePatheventsSaved, ref=> ref.orderByChild('uid').equalTo(uid)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.userEvents;
  }

  getUploads(id: string) {
    this.uploads = this.db.list(this.basePath, ref=> ref.orderByChild('id').equalTo(id)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  getUserUploads(id: string) {
    this.uploads = this.db.list(this.basePathusers, ref=> ref.orderByChild('id').equalTo(id)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }





  deleteUpload(upload: UploadFile) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch((error) => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: UploadFile, eventid: any) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePathusers}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.id = eventid;
          this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }



  pushNewImageUpload(upload: UploadFile, eventid: any) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePathUsersProfiles}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.id = eventid;
          this.auth.updateItem(this.auth.currentUserId, { photoURL: upload.url });
          this.saveProfilePictures(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  bookmarkEvent(eventId: string, eventTitle: string, eventStartDate: string,
    eventEndDate: string, eventStreet: string, eventPostcode: string) {

      const dataEvents: eventSave = {
      uid: this.auth.currentUserId,
      eventId: eventId,
      eventTitle: eventTitle,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      eventStreet: eventStreet,
      eventPostcode: eventPostcode,
      bookmarked: true,
      attending: false,
      publicProfile: false
    };
    this.itemsRef.push(dataEvents);
  }

  AttendEvent(eventId: string, eventTitle: string, eventStartDate: string,
    eventEndDate: string, eventStreet: string, eventPostcode: string) {
    const dataEvent: eventSave = {
    uid: this.auth.currentUserId,
    eventId: eventId,
      eventTitle: eventTitle,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      eventStreet: eventStreet,
      eventPostcode: eventPostcode,
      bookmarked: false,
      attending: true,
      publicProfile: false
  };
  this.itemsRef.push(dataEvent);
}

updateEventRegister(key: string, value: any): void {
  this.itemsRef.update(key, value);
}





  // Writes the file details to the realtime db
  private saveFileData(upload: UploadFile) {
    this.db.list(`${this.basePathusers}/`).push(upload);
  }
  private saveProfilePictures(upload: UploadFile) {
    this.db.list(`${this.basePathUsersProfiles}/`).push(upload);
  }

  private saveEvents(myevent: eventSave) {
    this.db.list(`${this.basePatheventsSaved}/`).push(myevent);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePathusers}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePathusers}/${name}`).delete()
  }
}
