let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
        let yyyy = today.getFullYear();
        let max_dd = today.getDate()+7;
        if(dd<10){
          dd='0'+dd
        }
        if(max_dd<10){
            max_dd='0'+max_dd
          }
        if(mm<10){
          mm='0'+mm
        } 
        console.log(max_dd);
        today = yyyy+'-'+mm+'-'+dd;
        max_day = yyyy+'-'+mm+'-'+max_dd;
        document.getElementById("depDate").setAttribute("min", today);
        document.getElementById("depDate").setAttribute("max", max_day);