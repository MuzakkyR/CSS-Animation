import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import { daysInMonth } from 'ionic-angular/util/datetime-util';

@IonicPage()
@Component({
  selector: 'gd-calendar',
  templateUrl: 'gd-calendar.html',
})
export class GdCalendarPage {

  @ViewChild('scrollView') scrollView: ElementRef;

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    for (let index = 0; index < 7; index++) {
      this.dayList.push(moment(index, 'e').format('dd'));
    }
  }

  getDaysArrayByMonth(date) { // mendapatkan array tanggal pada suatu bulan
    let totalDaysInMonth = moment(date).daysInMonth();
    let arrDays = [];
    while (totalDaysInMonth) {
      let current = moment(date).date(totalDaysInMonth);
      arrDays.unshift({
        day: current.format("DD"),
        month: current.format("MMMM"),
        year: current.format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected
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

  updateMonthArrays(params) { // dapetin bulan baru setelah scroll
    if (params == 'nextMonth') {
      this.previousMonth = this.currentMonth;
      this.currentMonth = this.nextMonth;
      this.nextMonth = this.getDaysArrayByMonth(this.nextActiveMonth);
    } else if (params == 'prevMonth') {
      this.nextMonth = this.currentMonth;
      this.currentMonth = this.previousMonth;
      this.previousMonth = this.getDaysArrayByMonth(this.prevActiveMonth);
    }
  }

  getFirstWeekLoadedArray() {
    let firstDayOfTheMonth = moment(this.prevActiveMonth).startOf("month"); // hari pertama 1 bulan sebelum
    let prevMonthDaysInFirstWeek = moment(firstDayOfTheMonth).weekday(); // hari pada bulan lain di minggu pertama 1 bulan sebelum
    for (let index = 0; index < prevMonthDaysInFirstWeek; index++) { // assign hari lain di minggu pertama ke array
      this.firstWeek.push({
        day: moment(firstDayOfTheMonth).weekday(index).format("DD"),
        month: moment(firstDayOfTheMonth).weekday(index).format("MMMM"),
        year: moment(firstDayOfTheMonth).weekday(index).format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected
      })
    }
  }

  getLastWeekLoadedArray() {
    let lastDayOfTheMonth = moment(this.nextActiveMonth).endOf("month"); // hari terakhir 1 bulan setelah
    let nextMonthDaysInFirstWeek = moment(lastDayOfTheMonth).weekday();// hari pada bulan lain di minggu terakhir 1 bulan setelah
    for (let index = 6; index > nextMonthDaysInFirstWeek; index--) { // assign hari lain di minggu terakhir array
      this.lastWeek.push({
        day: moment(lastDayOfTheMonth).weekday(index).format("DD"),
        month: moment(lastDayOfTheMonth).weekday(index).format("MMMM"),
        year: moment(lastDayOfTheMonth).weekday(index).format("YYYY"),
        start: this.startSelected,
        end: this.endSelected,
        between: this.betweenSelected
      })
    }
  }

  joinAllMonthsArray() { // concat semua array
    this.currentLoadedMonth = this.firstWeek.concat(this.previousMonth.concat(this.currentMonth.concat(this.nextMonth.concat(this.lastWeek))))
  }

  sliceMonthsArrayToWeeksArray() { // potong array jadi per minggu
    let tempArray = [];
    for (let index = 0; index < this.currentLoadedMonth.length; index += 7) {
      let sliceGroup = this.currentLoadedMonth.slice(index, index + 7);
      tempArray.push(sliceGroup);
    }
    this.weekArray = tempArray;
  }

  defineActiveMonth() {
    this.prevActiveMonth = moment(this.currentActiveMonth).add(-1, 'month'); //definisi 1 bulan sebelum
    this.nextActiveMonth = moment(this.currentActiveMonth).add(1, 'month'); //definisi 1 bulan setelah

    this.activeMonthLabel = this.currentActiveMonth.format("MMMM");
    this.activeYearLabel = this.currentActiveMonth.format("YYYY")

    this.activeMonthId = "01" + this.currentActiveMonth.format("MMMM") + this.currentActiveMonth.format("YYYY");
    this.prevMonthId = "01" + this.prevActiveMonth.format("MMMM") + this.prevActiveMonth.format("YYYY");
    this.nextMonthId = "01" + this.nextActiveMonth.format("MMMM") + this.nextActiveMonth.format("YYYY");
  }

  resetWeek() {
    this.firstWeek = [];
    this.lastWeek = [];
  }

  getAllCalendarData(params, month = null) {
    this.resetWeek();
    this.defineActiveMonth();
    if (params == 'new') {
      this.setDaysArrayByMonth();
    } else if (params == 'update') {
      this.updateMonthArrays(month);
    }
    this.getFirstWeekLoadedArray();
    this.getLastWeekLoadedArray();
    this.joinAllMonthsArray();
    this.sliceMonthsArrayToWeeksArray();
  }

  ngOnInit() {
    this.currentActiveMonth = moment();
    this.getAllCalendarData('new');
  }

  ngAfterViewInit() {
    this.elementParent = this.scrollView.nativeElement;
    this.elementParent.scrollTop = this.checkMonthPosition(this.activeMonthId);
  }

  toPrevMonth() {
    this.elementParent.scrollTop = this.checkMonthPosition(this.prevMonthId);
  }

  toNextMonth() {
    this.elementParent.scrollTop = this.checkMonthPosition(this.nextMonthId);
  }

  checkMonthPosition(monthId) {
    return document.getElementById(monthId).offsetTop;
  }

  onScroll() {
    if (this.elementParent.scrollTop - this.checkMonthPosition(this.activeMonthId) > this.elementParent.clientHeight / 4) {
      this.currentActiveMonth = this.nextActiveMonth; //scroll bawah
      this.getAllCalendarData('update', 'nextMonth');
      this.elementParent.scrollTop = this.checkMonthPosition(this.prevMonthId);
    } else if (this.elementParent.scrollTop - this.checkMonthPosition(this.activeMonthId) < this.elementParent.clientHeight / -4) {
      this.currentActiveMonth = this.prevActiveMonth; //scroll atas
      this.getAllCalendarData('update', 'prevMonth');      
      this.elementParent.scrollTop = this.checkMonthPosition(this.nextMonthId);
    }
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
        this.removeEndDate();
        this.removeInBetweenDate();
      }
    }
    else if (this.toggleStart && this.toggleEnd || this.toggleSameDay) { // mendapatkan end date ketika end date sudah terdefinisi di hari yang sama dengan start date
      this.assignEndDate(data, currentDate);
      this.toggleSameDay = false;
      data.end = false;
      if (moment(this.startDate).isBefore(this.endDate)) {
        this.removeEndDate();
        this.removeInBetweenDate();
        data.end = true;
        this.getInBetweenDate(data);
      } else {
        this.endDate = '';
        this.removeEndDate();
        this.removeInBetweenDate();
      }
    }
  }

  assignStartDate(data, currentDate) {
    this.startDate = currentDate;
    this.startDay = moment(this.startDate).format("dddd");
    this.startDayNumber = data.day;
    this.startMonth = moment(this.startDate).format("MMM");
    this.startYear = data.year;
  }

  assignEndDate(data, currentDate) {
    this.endDate = currentDate;
    this.endDay = moment(this.endDate).format("dddd");
    this.endDayNumber = data.day;
    this.endMonth = moment(this.endDate).format("MMM");
    this.endYear = data.year;
  }

  resetAllSelectedDate(data) {
    this.startDate = '';
    this.endDate = '';
    data.start = false;
    data.end = false;
    this.toggleStart = false;
    this.toggleEnd = false;
    this.toggleSameDay = false;
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