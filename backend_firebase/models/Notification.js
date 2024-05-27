class Notification {
  constructor(id, content, time, isRead) {
    (this.id = id),
      (this.content = content),
      (this.time = time),
      (this.isRead = isRead);
  }
}

module.exports = Notification;

