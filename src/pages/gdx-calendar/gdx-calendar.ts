import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import { daysInMonth } from 'ionic-angular/util/datetime-util';

@IonicPage()
@Component({
  selector: 'gdx-calendar',
  templateUrl: 'gdx-calendar.html',
})
export class GdxCalendarPage {

  @ViewChild('scrollView') scrollView: ElementRef;

  @Output() startDates = new EventEmitter();
  @Output() endDates = new EventEmitter();
  // @Input() Mode:any = 'single';

  //new
  previousMonth: any;
  currentMonth: any;
  nextMonth: any;

  activeMonthLabel: string;
  activeYearLabel: string;
  currentLoadedMonth: any = [];

  firstWeek: any = [];
  lastWeek: any = [];

  prevMonthId: string;
  activeMonthId: string;
  nextMonthId: string;

  currentActiveMonth: any;
  prevActiveMonth: any;
  nextActiveMonth: any;

  weekArray: any = [];
  dayList: any = [];

  elementParent: any;

  startSelected: boolean = false;
  endSelected: boolean = false;
  betweenSelected: boolean = false;
  toggleStart: boolean = false;
  toggleEnd: boolean = false;
  toggleSameDay: boolean = false;

  startDate: any;
  startDay: any;
  startDayNumber: any;
  startMonth: any;
  startYear: any;
  endDate: any;
  endDay: any;
  endDayNumber: any;
  endMonth: any;
  endYear: any;

  today: boolean = false;
  todayDate: any;

  mode:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    for (let index = 0; index < 7; index++) {
      this.dayList.push(moment(index, 'e').format('dd')); // inisial hari untuk table header
    }
    this.mode = navParams.get('mode');
    console.log(this.mode, ' tsoraya')
  }

  checkDateEvents(current) { //simpan state ketika scroll
    current.format("DDMMMMYYYY") == this.todayDate ? this.today = true : this.today = false;
    current.format("DDMMMMYYYY") == moment(this.startDate).format("DDMMMMYYYY") && this.startDate ? this.startSelected = true : this.startSelected = false;
    current.format("DDMMMMYYYY") == moment(this.endDate).format("DDMMMMYYYY") && this.endDate ? this.endSelected = true : this.endSelected = false;
    current.isBetween(this.startDate, this.endDate) ? this.betweenSelected = true : this.betweenSelected = false;
  }

  getDaysArrayByMonth(date) { // mendapatkan array tanggal 1 bulan penuh
    let totalDaysInMonth = moment(date).daysInMonth();
    let arrDays = [];
    while (totalDaysInMonth) {
      let current = moment(date).date(totalDaysInMonth);
      this.checkDateEvents(current);
      arrDays.unshift({
        days: current.format("dddd"),
        day: current.format("DD"),
        month: current.format("MMMM"),
        year: current.format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected,
        today: this.today
      });
      totalDaysInMonth--;
    }
    return arrDays;
  }

  setDaysArrayByMonth() {
    this.previousMonth = this.getDaysArrayByMonth(this.prevActiveMonth); //set array bulan sebelum
    this.currentMonth = this.getDaysArrayByMonth(this.currentActiveMonth); //set array bulan sekarang
    this.nextMonth = this.getDaysArrayByMonth(this.nextActiveMonth); // set array bulan setelah
  }

  getFirstWeekLoadedArray() { // get tambelan minggu pertama dibulan sebelum bulan aktif
    let firstDayOfTheMonth = moment(this.prevActiveMonth).startOf("month"); // hari pertama 1 bulan sebelum
    let prevMonthDaysInFirstWeek = moment(firstDayOfTheMonth).weekday(); // hari pada bulan lain di minggu pertama 1 bulan sebelum
    for (let index = 0; index < prevMonthDaysInFirstWeek; index++) { // assign hari lain di minggu pertama ke array
      this.checkDateEvents(moment(firstDayOfTheMonth).weekday(index));
      this.firstWeek.push({
        days: moment(firstDayOfTheMonth).weekday(index).format("dddd"),
        day: moment(firstDayOfTheMonth).weekday(index).format("DD"),
        month: moment(firstDayOfTheMonth).weekday(index).format("MMMM"),
        year: moment(firstDayOfTheMonth).weekday(index).format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected,
        today: this.today
      })
    }
  }

  getLastWeekLoadedArray() { // get tambelan minggu terakhir dibulan setelah bulan aktif
    let lastDayOfTheMonth = moment(this.nextActiveMonth).endOf("month"); // hari terakhir 1 bulan setelah
    let nextMonthDaysInFirstWeek = moment(lastDayOfTheMonth).weekday();
    for (let index = 6; index > nextMonthDaysInFirstWeek; index--) { // assign hari lain di minggu terakhir array
      this.checkDateEvents(moment(lastDayOfTheMonth).weekday(index));
      this.lastWeek.push({
        days: moment(lastDayOfTheMonth).weekday(index).format("dddd"),
        day: moment(lastDayOfTheMonth).weekday(index).format("DD"),
        month: moment(lastDayOfTheMonth).weekday(index).format("MMMM"),
        year: moment(lastDayOfTheMonth).weekday(index).format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected,
        today: this.today
      })
    }
  }

  joinAllMonthsArray() { // concat semua array
    this.currentLoadedMonth = this.firstWeek.concat(this.previousMonth.concat(this.currentMonth.concat(this.nextMonth.concat(this.lastWeek))))
  }

  sliceMonthsArrayToWeeksArray(array) { // potong array jadi per minggu
    let tempArray = [];
    for (let index = 0; index < array.length; index += 7) {
      let sliceGroup = array.slice(index, index + 7);
      tempArray.push(sliceGroup);
    }
    return tempArray;
  }

  defineActiveMonth() {
    this.prevActiveMonth = moment(this.currentActiveMonth).add(-1, 'month'); //definisi 1 bulan sebelum
    this.nextActiveMonth = moment(this.currentActiveMonth).add(1, 'month'); //definisi 1 bulan setelah

    this.activeMonthLabel = this.currentActiveMonth.format("MMMM");
    this.activeYearLabel = this.currentActiveMonth.format("YYYY")

    this.activeMonthId = "01" + this.currentActiveMonth.format("MMMM") + this.currentActiveMonth.format("YYYY");
    this.prevMonthId = "01" + this.prevActiveMonth.format("MMMM") + this.prevActiveMonth.format("YYYY");
    this.nextMonthId = "01" + this.nextActiveMonth.format("MMMM") + this.nextActiveMonth.format("YYYY");
    this.todayDate = moment().format("DDMMMMYYYY");
  }

  resetWeek() {
    this.firstWeek = [];
    this.lastWeek = [];
  }

  getAllCalendarData() {
    this.resetWeek();
    this.setDaysArrayByMonth();
    this.getFirstWeekLoadedArray();
    this.getLastWeekLoadedArray();
    this.joinAllMonthsArray();
    this.weekArray = this.sliceMonthsArrayToWeeksArray(this.currentLoadedMonth);
  }

  ngOnInit() {
    this.currentActiveMonth = moment();
    this.defineActiveMonth();
    this.getAllCalendarData();
  }

  ngAfterViewInit() {
    this.elementParent = this.scrollView.nativeElement;
    this.elementParent.scrollTop = this.checkMonthPosition(this.activeMonthId);
  }

  toMonth(params) {
    params == 'prev' ? this.elementParent.scrollTop = this.checkMonthPosition(this.prevMonthId) : this.elementParent.scrollTop = this.checkMonthPosition(this.nextMonthId);
  }

  checkMonthPosition(monthId) {
    return document.getElementById(monthId).offsetTop;
  }

  onScroll() {
    if (Math.floor((this.elementParent.scrollTop - this.checkMonthPosition(this.activeMonthId)) / 53) > Math.floor((this.elementParent.clientHeight / 53) / 2.3)) {
      this.scrollBottomShiftArray(); // hapus array bulan paling depan
      this.currentActiveMonth = this.nextActiveMonth; //scroll bawah
      this.defineActiveMonth();
      this.setDaysArrayByMonth();
      this.resetWeek();
      this.scrollBottomPushArray(); // tambah array bulan paling belakang

    } else if (Math.floor((this.elementParent.scrollTop - this.checkMonthPosition(this.activeMonthId)) / 53) < Math.floor((this.elementParent.clientHeight / 53) / -2.3)) {
      this.scrollTopPopArray(); // hapus array bulan paling belakang
      this.currentActiveMonth = this.prevActiveMonth; //scroll atas
      this.defineActiveMonth();
      this.setDaysArrayByMonth();
      this.resetWeek();
      this.scrollTopPushArray() // tambah array bulan paling depan
    }
  }

  scrollTopPushArray() {
    let firstWeekArray: any;
    let joinFirstWeek: any;
    let angka: any = 0;
    this.getFirstWeekLoadedArray();
    firstWeekArray = this.weekArray[0];
    firstWeekArray.forEach(daily => {
      this.previousMonth.forEach(nextDaily => {
        if (daily.day + daily.month == nextDaily.day + nextDaily.month) {
          angka++;
        }
      });
    });
    for (let index = 0; index < angka; index++) {
      this.previousMonth.pop();
    }

    joinFirstWeek = this.sliceMonthsArrayToWeeksArray(this.firstWeek.concat(this.previousMonth)).reverse();
    joinFirstWeek.forEach(element => {
      this.weekArray.unshift(element);
    });
  }

  scrollBottomPushArray() {
    let lastWeekArray: any;
    let joinLastWeek: any;

    this.getLastWeekLoadedArray();
    lastWeekArray = this.weekArray[this.weekArray.length - 1];
    lastWeekArray.forEach(daily => {
      this.nextMonth.forEach(nextDaily => {
        if (daily.day + daily.month == nextDaily.day + nextDaily.month) {
          this.nextMonth.shift()
        }
      });
    });

    joinLastWeek = this.sliceMonthsArrayToWeeksArray(this.nextMonth.concat(this.lastWeek.reverse()));
    joinLastWeek.forEach(element => {
      this.weekArray.push(element);
    });
  }

  scrollTopPopArray() {
    let afterNextMonth = this.nextMonth;
    let checkNextMonth: boolean = false;
    let checkNextMonths: boolean = false;
    let tempArray: any = [];
    let nextMonthArray: any;

    this.weekArray.forEach(weekly => {
      weekly.forEach(daily => {
        afterNextMonth.forEach(after => {
          if (after.day + after.month == daily.day + daily.month) {
            checkNextMonth = true;
          }
        });
      });
      if (checkNextMonth) {
        tempArray.push(weekly);
        checkNextMonth = false;
      }
    });

    nextMonthArray = this.currentActiveMonth.format("MMMM");
    tempArray.forEach(elements => {
      elements.reverse().forEach(element => {
        if (element.month != nextMonthArray) {
          checkNextMonths = true;
        } else {
          checkNextMonths = false;
        }
      });
      elements.reverse();
      if (checkNextMonths) {
        this.weekArray.pop();
        checkNextMonths = false;
      }
    });
  }
  scrollBottomShiftArray() {
    let beforePrevMonth = this.previousMonth;
    let checkPrevMonth: boolean = false;
    let checkPrevMonths: boolean = false;
    let tempArray: any = [];
    let prevMonthArray: any;

    this.weekArray.forEach(weekly => {
      weekly.forEach(daily => {
        beforePrevMonth.forEach(before => {
          if (before.day + before.month == daily.day + daily.month) {
            checkPrevMonth = true;
          }
        });
      });
      if (checkPrevMonth) {
        tempArray.push(weekly);
        checkPrevMonth = false;
      }
    });

    prevMonthArray = this.currentActiveMonth.format("MMMM");
    tempArray.forEach(elements => {
      elements.forEach(element => {
        if (element.month != prevMonthArray) {
          checkPrevMonths = true;
        } else {
          checkPrevMonths = false
        };
      });
      if (checkPrevMonths) {
        this.weekArray.shift();
        checkPrevMonths = false;
      }
    });
  }

  selectDate(data) {
    let currentDate = data.day + '-' + data.month + '-' + data.year;
    if (!this.toggleStart) { // klik tanggal 1x untuk dapat start date
      data.start = true;
      this.toggleStart = true;
      this.assignStartDate(data, currentDate);
    }
    else if (this.toggleStart && this.startDate == currentDate && !this.toggleSameDay) { // klik tanggal 2x di hari yg sama untuk dapat end date
      this.removeEndDate();
      data.end = true;
      this.toggleSameDay = true;
      this.assignEndDate(data, currentDate);
      this.removeInBetweenDate();
      this.toggleEnd = true;
    }
    else if (this.startDate == currentDate && this.endDate == currentDate && this.toggleSameDay) { //klik tanggal 3x di hari yg sama untuk reset
      this.resetAllSelectedDate(data);
    }
    else if (this.toggleStart && !this.toggleEnd) { // mendapatkan end date di hari yang berbeda dengan start date
      this.assignEndDate(data, currentDate);
      if (moment(this.startDate).isBefore(this.endDate)) { // check kalo start date sebelum end date
        data.end = true;
        this.getInBetweenDate(data);
      } else { // ketika end date di klik sebelum start date maka berubah jadi start date
        this.removeStartDate();
        this.assignStartDate(data, currentDate);
        data.start = true;
        this.toggleStart = true;
        this.endDate = '';
        this.endDates.emit(this.endDate);
        this.removeEndDate();
        this.removeInBetweenDate();
      }
    }
    else if (this.toggleStart && this.toggleEnd || this.toggleSameDay) { // mendapatkan end date ketika end date sudah terdefinisi di hari yang sama dengan start date
      this.resetAllSelectedDate(data);
      data.start = true;
      this.toggleStart = true;
      this.assignStartDate(data, currentDate);
    }
  }

  assignStartDate(data, currentDate) {
    this.startDate = currentDate;
    this.startDay = moment(this.startDate).format("dddd");
    this.startDayNumber = data.day;
    this.startMonth = moment(this.startDate).format("MMM");
    this.startYear = data.year;
    this.startDates.emit(this.startDate);
  }

  assignEndDate(data, currentDate) {
    this.endDate = currentDate;
    this.endDay = moment(this.endDate).format("dddd");
    this.endDayNumber = data.day;
    this.endMonth = moment(this.endDate).format("MMM");
    this.endYear = data.year;
    this.endDates.emit(this.endDate);
  }

  resetAllSelectedDate(data) {
    this.startDate = '';
    this.startDay = '';
    this.startDayNumber = '';
    this.startMonth = '';
    this.startYear = '';
    this.startDates.emit(this.startDate);

    this.endDate = '';
    this.endDay = '';
    this.endDayNumber = '';
    this.endMonth = '';
    this.endYear = '';
    this.endDates.emit(this.endDate);

    data.start = false;
    data.end = false;
    this.toggleStart = false;
    this.toggleEnd = false;
    this.toggleSameDay = false;

    this.removeStartDate();
    this.removeInBetweenDate();
    this.removeEndDate();
  }

  getInBetweenDate(data) { // mendapatkan tanggal diantara start date dan end date
    this.weekArray.forEach(element => {
      element.forEach(elements => {
        let tanggal = elements.day + elements.month + elements.year;
        if (moment(tanggal).isBetween(this.startDate, this.endDate)) {
          elements.between = true;
        }
      });
    });
    this.toggleEnd = true
  }

  removeInBetweenDate() {
    this.weekArray.forEach(element => {
      element.forEach(elements => {
        elements.between = false;
      });
    });
  }

  removeEndDate() {
    this.weekArray.forEach(element => {
      element.forEach(elements => {
        elements.end ? elements.end = false : elements.end
      });
    });
    this.toggleEnd = false;
  }

  removeStartDate() {
    this.weekArray.forEach(element => {
      element.forEach(elements => {
        elements.start ? elements.start = false : elements.start
      });
    });
    this.toggleStart = false;
  }
}