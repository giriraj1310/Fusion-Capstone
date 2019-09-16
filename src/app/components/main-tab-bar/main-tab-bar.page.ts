import { Component } from '@angular/core';
import { NotificationsManager } from 'src/app/classes/notifications/NotificationsManager';
import { NotifsManagerEvents } from 'src/app/classes/notifications/NotifsManagerEvent';
import { AppNotification } from 'src/app/classes/notifications/AppNotification';
import { NotificationSeverity } from 'src/app/classes/notifications/NotificationSeverity';

@Component({
  selector: 'app-main-tab-bar',
  templateUrl: 'main-tab-bar.page.html',
  styleUrls: ['main-tab-bar.page.scss']
})
export class MainTabBarPage {
  constructor() {
    NotificationsManager.subscribeTo(NotifsManagerEvents.OnNotifAdded, MainTabBarPage.updateReadNotifsBadge);
  }

  ionViewDidEnter() {
    this.notifsTest();
  }

  private notifsTest() {
    NotificationsManager.addNotification(new AppNotification(
      "Some Information",
      "Hey there. This notification is just letting you know about something.",
      NotificationSeverity.Information,
      new Date(2019, 8, 12)
    ));

    NotificationsManager.addNotification(new AppNotification(
      "Some Alert",
      "Don't forget about that thing that this notification is reminding you about!",
      NotificationSeverity.Alert,
      new Date(2019, 8, 8)
    ));

    NotificationsManager.addNotification(new AppNotification(
      "Some Error",
      "Uh oh, something went wrong. This notification has the details.",
      NotificationSeverity.Error,
      new Date(2019, 8, 4)
    ));

    setInterval(() => {
      let randInt: number = Math.round(Math.random() * 3);

      if(randInt === 0) {
        NotificationsManager.addNotification(new AppNotification(
          "New Info",
          "Hey there. This is a new notification that will show up every 30 seconds for testing purposes.",
        ));
      }
      else if(randInt == 1) {
        NotificationsManager.addNotification(new AppNotification(
          "New Alert",
          "Hey there. This is a new notification that will show up every 30 seconds for testing purposes.",
          NotificationSeverity.Alert
        ));
      }
      else {
        NotificationsManager.addNotification(new AppNotification(
          "New Error",
          "Hey there. This is a new notification that will show up every 30 seconds for testing purposes.",
          NotificationSeverity.Error
        ));
      }
    },
      30000
    );
  }

  public static updateReadNotifsBadge() {
    const badge = document.getElementById("notifs-badge");
    let numOfUnreads: number = 0;

    NotificationsManager.notifications.forEach(notif => {
      if(!notif.isRead) {
        numOfUnreads++;
      }
    });

    badge.innerText = numOfUnreads.toString();

    if(numOfUnreads > 0) {
      badge.classList.remove("hidden");
    }
    else {
      badge.classList.add("hidden");
    }
  }
}