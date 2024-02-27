$(function () {

    function get_ramadhan_time() {
        return new Date("Januari 1, 2024 00:00:00").getTime();
    }

    function get_current_time() {
        return new Date().getTime();
    }

    function update_time(updated_time) {
        let updated_time_string = format_to_string(updated_time);
        let remaining_time = $("#remaining_time");
        remaining_time.html(updated_time_string);
    }

    function calculate() {
        // get ramadhan time
        let ramadhan_time = get_ramadhan_time();
        // get current time
        let current_time = get_current_time();
        // calculate the remaining time
        let remaining_time = Math.floor(ramadhan_time - current_time);

        let remaining_time_in_seconds = Math.floor(remaining_time / 1000);

        let day = Math.floor(remaining_time_in_seconds / (24 * 60 * 60));
        let remainder_hours = Math.floor(remaining_time_in_seconds % (24 * 60 * 60));

        let hours = Math.floor(remainder_hours / (60 * 60));
        let remainder_minutes = Math.floor(remainder_hours % (60 * 60));

        let minutes = Math.floor(remainder_minutes / 60);
        let remainder_seconds = Math.floor(remainder_minutes % 60);

        let seconds = remainder_seconds;

        let updated_time = {
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

        return updated_time;
    }

    function format_to_string(updated_time) {
        let updated_time_string = `
        Tahun Baru
        ${updated_time.day}H :
        ${updated_time.hours}J :
        ${updated_time.minutes}M :
        ${updated_time.seconds}D
        `;

        return updated_time_string;
    }

    function execute() {
        let updated_time = calculate();
        update_time(updated_time);
    }

    setInterval(execute, 1000);

});

function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("clock1").innerText = time;
    document.getElementById("clock1").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();