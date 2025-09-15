#import "PurchaseReminder.h"
#import <EventKit/EventKit.h>

@implementation PurchaseReminder

RCT_EXPORT_MODULE(PurchaseReminder);

RCT_REMAP_METHOD(addReminder,
                 title:(NSString *)title
                 notes:(NSString * _Nullable)notes
                 startTimestampMs:(nonnull NSNumber *)startTimestampMs
                 durationMinutes:(nonnull NSNumber *)durationMinutes
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  EKEventStore *store = [[EKEventStore alloc] init];

  [store requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError * _Nullable error) {
    if (error != nil) {
      reject(@"EK_REQUEST_ERROR", error.localizedDescription, error);
      return;
    }
    if (!granted) {
      reject(@"EK_NOT_GRANTED", @"Calendar permission not granted", nil);
      return;
    }

    // Dates
    NSTimeInterval startInterval = [startTimestampMs doubleValue] / 1000.0; // ms -> s
    NSDate *startDate = [NSDate dateWithTimeIntervalSince1970:startInterval];
    NSTimeInterval durationSec = ([durationMinutes doubleValue] * 60.0);
    NSDate *endDate = [startDate dateByAddingTimeInterval:durationSec];

    // Default calendar for new events
    EKCalendar *calendar = [store defaultCalendarForNewEvents];
    if (calendar == nil) {
      reject(@"EK_NO_CALENDAR", @"No default calendar available", nil);
      return;
    }

    // Event
    EKEvent *event = [EKEvent eventWithEventStore:store];
    event.calendar = calendar;
    event.title = title ?: @"Purchase reminder";
    event.notes = notes ?: @"";
    event.startDate = startDate;
    event.endDate = endDate;

    // Alarm: 10 minutes before
    EKAlarm *alarm = [EKAlarm alarmWithRelativeOffset:-10 * 60];
    event.alarms = @[alarm];

    NSError *saveError = nil;
    BOOL ok = [store saveEvent:event span:EKSpanThisEvent commit:YES error:&saveError];
    if (!ok || saveError != nil) {
      reject(@"EK_SAVE_ERROR", saveError.localizedDescription ?: @"Failed to save event", saveError);
      return;
    }

    // Resolve with eventIdentifier
    resolve(@{ @"eventId": event.eventIdentifier ?: @"" });
  }];
}

@end
