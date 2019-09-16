import { Component } from "@angular/core";
import { AlertController, IonItemSliding } from "@ionic/angular";
import { NotificationsManager } from 'src/app/classes/notifications/NotificationsManager';
import { AppNotification } from 'src/app/classes/notifications/AppNotification';
import { MainTabBarPage } from 'src/app/components/main-tab-bar/main-tab-bar.page';
import { NotifsManagerEvents } from 'src/app/classes/notifications/NotifsManagerEvent';
import { NotificationSeverity } from 'src/app/classes/notifications/NotificationSeverity';

@Component({
  selector: "notifications-home-tab",
  templateUrl: "notifications-tab.page.html",
  styleUrls: ["notifications-tab.page.scss"]
})
export class NotificationsTabPage {
  constructor(public alertController: AlertController) {
    NotificationsManager.subscribeTo(NotifsManagerEvents.OnNotifAdded, this.sortNotifs);
  }

  get notifications(): AppNotification[] {
    return NotificationsManager.notifications;
  }

  sortNotifs() {
    const sortSelect = document.getElementById("sort-by-select") as HTMLIonSelectElement;

    switch(sortSelect.value) {
      default:
        NotificationsTabPage.sortNotifsByNewest();
        break;
      case "oldest":
        NotificationsTabPage.sortNotifsByOldest();
        break;
      case "unread":
        NotificationsTabPage.sortNotifsByUnread();
        break;
      case "read":
        NotificationsTabPage.sortNotifsByRead();
        break;
      case "information":
      case "alert":
      case "error":
        NotificationsTabPage.sortNotifsBySeverity(sortSelect.value);
        break;
    }
  }

  async viewNotif(notif: AppNotification) {
    const notifAlert = await this.alertController.create({
      header: notif.title,
      message: notif.summary,
      buttons: ["Close"]
    });

    await notifAlert.present();

    NotificationsManager.setNotifRead(notif, true);
    MainTabBarPage.updateReadNotifsBadge();

    NotificationsTabPage.updateNotifsReadSort();
  }

  toggleNotifRead(notif: AppNotification, slideItem: IonItemSliding) {
    slideItem.close();

    NotificationsManager.setNotifRead(notif, !notif.isRead);
    MainTabBarPage.updateReadNotifsBadge();

    NotificationsTabPage.updateNotifsReadSort();
  }

  deleteNotif(notif: AppNotification, slideItem: HTMLIonItemSlidingElement, notifElement: HTMLElement) {
    slideItem.close();
    notifElement.classList.add("deleting");

    setTimeout(() => {
      NotificationsManager.deleteNotification(notif);
      MainTabBarPage.updateReadNotifsBadge();
    }, 300);
  }

  private static updateNotifsReadSort() {
    const sortSelect = document.getElementById("sort-by-select") as HTMLIonSelectElement;

    if(sortSelect.value == "unread") {
      this.sortNotifsByUnread();
    }
    else if(sortSelect.value == "read") {
      this.sortNotifsByRead();
    }
  }

  private static sortNotifsByNewest() {
    let notifications = NotificationsManager.notifications;

    notifications.sort(function(notif1, notif2) {
      return notif2.dateReceived.getTime() - notif1.dateReceived.getTime();
    });
  }

  private static sortNotifsByOldest() {
    let notifications = NotificationsManager.notifications;

    notifications.sort(function(notif1, notif2) {
      return notif1.dateReceived.getTime() - notif2.dateReceived.getTime();
    });
  }

  private static sortNotifsByUnread() {
    let notifications = NotificationsManager.notifications;
    notifications.sort(notif => (notif.isRead ? 1 : -1));
  }

  private static sortNotifsByRead() {
    let notifications = NotificationsManager.notifications;
    notifications.sort(notif => (!notif.isRead ? 1 : -1));
  }

  private static sortNotifsBySeverity(severity: NotificationSeverity) {
    let notifications = NotificationsManager.notifications;
    notifications.sort(notif => (notif.severity === severity ? -1 : 1));
  }


  /**
   * @todo: Create a notification settings modal page.
   */
  async openNotifSettings() { }
}