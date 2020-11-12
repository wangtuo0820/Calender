
// dictionary to store month sequence detais with their names
var monthnames={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"};

function Isleap(year) //function to check leap year
  {
      return (year%4==0 && year%100!=0)||(year%400==0);
  }




var month=1;  //default month 
var year=2020;  // default year

var is_start=true;
var start_date, end_date;



function showcalender(month,year)   //function to show the calender 
  {
  let days=0
  let monthdays={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}


  if (Isleap(year))     //changing no of days in february on leap year
  {
      monthdays[2]=29;
  }


  for(let y=1800;y<year;y++)  // calculating total no of days since 1 january 1800
  {
      if(Isleap(y))
      {
          days+=366;
      }
      else
      {
          days+=365;
      }
  }



  for(let d=1;d<month;d++) //calculating total no days till the required month
  {
      for(let m=1;m<=monthdays[d];m++)
      {
          days+=1
      }
  }


  let first_date_day=(((days+1)%7)+2)%7;//finding the day on date 1 of required month
  let count=1
  let last_monthdays=1;         

  if (month==1) //for previous month details
  {
    last_monthdays=monthdays[12];
  }
  else
  {
    last_monthdays=monthdays[month-1];
  }


  for(let cells=0;cells<42;cells++)  //for clearing previous dates 
  {
      document.getElementById((cells).toString()).innerHTML="";
      
  }


  for(let cells=first_date_day-1;cells>=0;cells--) //for filling last month details
  {
      document.getElementById((cells).toString()).innerHTML=last_monthdays--;
      document.getElementById((cells).toString()).style.color="lightgrey";       
      document.getElementById((cells).toString()).style.background="";       
  }


  for(let d=0;d<monthdays[month];d++) //for filling required  month details
  {
      document.getElementById((first_date_day+d).toString()).innerHTML=count++;
      document.getElementById((first_date_day+d).toString()).style.textAlign="center";  
      document.getElementById((first_date_day+d).toString()).style.verticalAlign="middle"; 
      if((first_date_day+d)%7==0)
      {
        document.getElementById((first_date_day+d).toString()).style.color="red"; 
        document.getElementById((first_date_day+d).toString()).style.background=""; 
      }
      else
      {
        document.getElementById((first_date_day+d).toString()).style.color="black"; 
        document.getElementById((first_date_day+d).toString()).style.background=""; 
      }

    // 保留选择的日期
      if(start_date && end_date)
      {
          cur_date = new Date([year, month, d+1].join("/"))
          if(cur_date >= start_date && cur_date <= end_date)
          {
            console.log(d, first_date_day)
            document.getElementById((first_date_day+d).toString()).style.background="lightgreen"; 
          }
      }
  }

  count=1;
  for(let cells=first_date_day+monthdays[month];cells<=41;cells++) //for filling next month details
  {
      document.getElementById((cells).toString()).innerHTML=count++;
      document.getElementById((cells).toString()).style.color="lightgrey";       
      document.getElementById((cells).toString()).style.background="";       
  }
  }


showcalender(month,year);  //function is called with default values of month and year for the first time

function addlistener()
{
    d = document.getElementsByClassName("date");
    for(i = 0; i < d.length; i++)
    {
        d[i].addEventListener('click', click_recall);
        d[i].addEventListener('mouseover', mouseover_recall);
    }

    d = document.getElementsByClassName("sun");
    for(i = 0; i < d.length; i++)
    {
        d[i].addEventListener('click', click_recall);
        d[i].addEventListener('mouseover', mouseover_recall);
    }
}

addlistener();



function nextmonth() //function for next month button
{
    if (month==12 && year==1000000)
    {
      document.getElementById("next").disabled=true;
    }
    else
    {
      if(month==12)
      {
        month=1;
        year++;
      }
      else
      {
        month++;
      }
    }
    document.getElementById("monthmenu").value=month;
    document.getElementById("year").value=year;
    document.getElementById("heading").innerHTML=monthnames[month]+"  "+year;
    showcalender(month,year);
    
}

function click_recall()
{
    day = event.target.innerHTML
    // window.alert([year, "年", month, "月", day, "日"].join(" "));

    let style_color = document.getElementById(event.target.id).style.color 
    if(style_color == 'lightgrey')
    {
        if(event.target.id > 27)
            nextmonth()
        if(event.target.id < 14)
            previousmonth()
        return
    }

    if(is_start)
    {
        start_date = new Date([year, month, day].join("/"))
        is_start = !is_start;
        end_date = null
    }
    else
    {
        end_date = new Date([year, month, day].join("/"))
        if(end_date < start_date)
        {
            window.alert("The start date must be before the end date.");
        }
        else
        {
            window.alert(start_date.toLocaleDateString() + " to "+end_date.toLocaleDateString() + " selected")
        }
        is_start = !is_start;

    }
}

function mouseover_recall()
{
    if(document.getElementById(event.target.id).style.color == 'lightgrey')
        return;



    cur_day = event.target.innerHTML;
    cur_date = new Date([year, month, cur_day].join("/"))
    cur_id = event.target.id;

    if(!is_start && start_date)  // 已经开始
    {
        // 保证选中区域跟随鼠标
        d = document.getElementsByClassName('date');
        for(i = 0; i < d.length; i++)
        {
            d[i].style.background = "";
        }
        d = document.getElementsByClassName('sun');
        for(i = 0; i < d.length; i++)
        {
            d[i].style.background = "";
        }


        while(start_date <= cur_date)
        {
            document.getElementById(cur_id).style.background = "lightgreen";
            if(cur_id == 0)
                break;

            next_id = (Number(cur_id) - 1).toString();
            next_day = document.getElementById(next_id).innerHTML;

            if(Number(next_day) > Number(cur_day))
                break;

            next_date = new Date([year, month, next_day].join("/"))
            cur_date = next_date;
            cur_id = next_id;
            cur_day = next_day;
        }

    }
}


function previousmonth() //function for previous month button
{
    if (month==1 && year==1800)
    {
      document.getElementById("previous").disabled=true;
    }
    else
    {
      if(month==1)
      {
        month=12;
        year--;
      }
      else
      {
        month--;
      }
    }
    document.getElementById("monthmenu").value=month;
    document.getElementById("year").value=year;
    document.getElementById("heading").innerHTML=monthnames[month]+"  "+year;
    showcalender(month,year);

}



function getvalues() //function for submit button
{
  month=document.getElementById("monthmenu").value;
  year=document.getElementById("year").value;
  if(year<1800 || year>1000000)
  {
    year=2020;
    month=1;
    document.getElementById("year").value=2020;
  }
  document.getElementById("heading").innerHTML=monthnames[month]+"  "+year;
  showcalender(month,year);
}
