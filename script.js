"use strict"

// Хранилище сайта
let organiserStorage = [];
let organiserStorageJson = null;
let moneySum = 0;

// let moneySumJson = null;
//let currentThemeJson = null;

window.addEventListener('load', documentReady)
function documentReady(){
    restoreInfo();
    //debugger

}
let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
let stringName='LIPOUSKI_TO_DO_LIST';

function storeInfo() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!==undefined )
        alert(callresult.error);
    else {
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(organiserStorageJson), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!==undefined )
        alert(callresult.error);
}

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!==undefined )
        alert(callresult.error);
    else if ( callresult.result!=="" ) {

        let info=JSON.parse(callresult.result);
        themeNameDisplay.innerHTML = info.currentTheme;
        moneySum = info.currentMoney;
        organiserStorage = info.storage;
        windowRearange();
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}





// Лого сайта
let clock = document.getElementById("clock");               // Иконка часов
let clockStorage = document.getElementById("clockStorage"); // Контейнер часов

// Навигация
let dropBar = document.getElementById("barID");       // Иконка  дроп меню
let dropMenu = document.getElementById("dropMenuID"); // Поле навигации Drop Menu
let noTheme = document.getElementById("noThemeID");   // заполнитель если не Тем
let dropMenuItems = document.getElementsByClassName("dropMenuElement");

// фон вызова всех меню
let backGr = document.getElementById("menuContainerID");

// Базовая подсказка, если темы отсутствуют
let helpTxt = document.getElementById("helpID");

// Контейнер всех элементов страницы
let themeWrap = document.getElementById("themeWrapID");

// Создание темы
let plusBtn = document.getElementById("plusID");                 //Большой плюс - создание темы
let themeSelect = document.getElementById("themeNameCreateID");  // Меню ввода названия темы
let themeMenuOk = document.getElementById("themeNameOk");        // Подтверждение ввода Названия темы
let themeMenuCancel = document.getElementById("themeNameCancel");// Отмена вводы Названия темы
let themeNameInput = document.getElementById("themeNameID");     // Поле ввода Названия темы
let themeNameHeader = document.getElementById("themeHeaderID");  // Контейнер для Названия темы
let themeNameDisplay = document.getElementById("themeNameDisplay");  // Header Темы
// Удаление темы
let deleteThemeBtn = document.getElementById("binID");
let themeDeleteMenu = document.getElementById("themeDeleteApproveMenu");
let themeDeleteOk = document.getElementById("themeDeleteApproveOk");
let themeDeleteCancel = document.getElementById("themeDeleteApproveCancel");


// Short term
let shortTermSelect = document.getElementById("shortTermItemCreateID"); // Меню ввода short Task
let shortTermNameInput = document.getElementById("shortTermNameID");    // Поле ввода названия short Task
let shortTermMoneyInput = document.getElementById("shortTermMoneyID");  // Поле ввода short Money
let shortTermOk = document.getElementById("shortTermNameOk");           // Подтверждение ввода short Task
let shortTermCancel = document.getElementById("shortTermNameCancel");   // Отмена ввода short Task
let shortTermStorage = document.getElementById("shortTermStorage");      // Поле Short term Tasks

// Long term
let longTermSelect = document.getElementById("longTermItemCreateID"); // Меню ввода long Task
let longTermNameInput = document.getElementById("longTermNameID");    // Поле ввода названия  long Task
let longTermMoneyInput = document.getElementById("longTermMoneyID");  // Поле ввода денег  long Money
let longTermOk = document.getElementById("longTermNameOk");           // Подтверждение ввода  longTask
let longTermCancel = document.getElementById("longTermNameCancel");   // Отмена ввода long Task
let longTermStorage = document.getElementById("longTermStorage");      // ДОМ Поле Long term Tasks

// Done
let doneStorage = document.getElementById("doneStorage");

// Все Term Plans
let allShortPlans = document.getElementsByClassName("shortTaskWrap");
let allLongPlans = document.getElementsByClassName("longTaskWrap");
let allDonePlans = document.getElementsByClassName("doneTaskWrap");
let plusBtnStorage = document.getElementsByClassName("plusMini");

// Short n Long Manipulations
let deletePlanBtn = document.getElementById("deletePlanBtn");   // Delete Plan (Short n Long)
let donePlanBtn = document.getElementById("donePlanBtn");  // Done Plan (Short n Long)
let planManipulationMenu = document.getElementById("planManipulationMenuID"); // Menu
let planDeleteApprove = document.getElementById("planDeleteApprove");
let planDeleteOk = document.getElementById("planDeleteApproveOk");
let planDeleteCancel = document.getElementById("planDeleteApproveCancel");

// Done Manipulations
let donePlanDeleteMenu = document.getElementById("donePlanDeleteMenuID");
let donePlanDeleteBtn = document.getElementById("deleteDonePlanBtn");
let donePlanDeleteApprove = document.getElementById("donePlanDeleteApprove");
let donePlanDeleteOk = document.getElementById("donePlanDeleteApproveOk");
let donePlanDeleteCancel = document.getElementById("donePlanDeleteApproveCancel");

// Add Savings
let savingsMenu = document.getElementById("addSavingsMenu");
let savingsInput = document.getElementById("currentSavingsInput")
let savingsMenuOk = document.getElementById("addSavingsMenuOk");
let savingsMenuCancel = document.getElementById("addSavingsMenuCancel");
let moneyDisplay = document.getElementById("moneyDisplay");
let moneyWrap = document.getElementById("moneyWrap");


function PlanElement() {
    let self = this;

    self.newTaskWrap = document.createElement("div");
    self.newTask = document.createElement("div");
    self.newTask.className = "taskContainer";
    self.taskTitle = document.createElement("span");
    self.taskMoney = document.createElement("span");
    self.taskMoney.style.marginRight = "25px";
    self.moneySign = document.createElement("i");
    self.moneySign.className = "fas fa-dollar-sign dollarSignIcon";

    self.newTask.appendChild(self.taskTitle);
    self.newTask.appendChild(self.moneySign);
    self.newTask.appendChild(self.taskMoney);
    self.newTaskWrap.appendChild(self.newTask);

}

function NavigationElement() {
    let self = this;

    self.newNavItem = document.createElement("div");
    self.newNavItem.className = "dropMenuElement";


}


function windowRearange() {      // Перерисовка темы основываясь на organiserStorage

    if(organiserStorage.length === 0){
        helpTxt.style.display = "block";
        noTheme.style.display = "block";
        themeWrap.style.display = "none"
    }
    else{
        helpTxt.style.display = "none";
        noTheme.style.display = "none";
        themeWrap.style.display = "block"
    }

    //themeWrap.style.display = "block";
    organiserStorageJson = {
        storage: organiserStorage,
        currentMoney: moneySum,
        currentTheme: themeNameDisplay.innerHTML
    };

    savingsInput.value = moneyDisplay.innerHTML;
    // Запуск анимации часов
    clockStorage.removeChild(clock);
    clockStorage.insertBefore(clock, clockStorage.firstChild);

    // Ощищение всех Short Plans
    let allShortPlansStorage = [];
    for (let i = 0; i < allShortPlans.length; i++) {
        allShortPlansStorage.push(allShortPlans[i]);
    }
    allShortPlansStorage.forEach(clearShortTermStorage);

    function clearShortTermStorage(el) {
        shortTermStorage.removeChild(el);
    }

    // Ощищение всех Long Plans
    let allLongPlansStorage = [];
    for (let i = 0; i < allLongPlans.length; i++) {
        allLongPlansStorage.push(allLongPlans[i]);
    }
    allLongPlansStorage.forEach(clearLongTermStorage);

    function clearLongTermStorage(el) {
        longTermStorage.removeChild(el);
    }

    // Ощищение всех Done Plans
    let allDonePlansStorage = [];
    for (let i = 0; i < allDonePlans.length; i++) {
        allDonePlansStorage.push(allDonePlans[i]);
    }
    allDonePlansStorage.forEach(clearDoneStorage);

    function clearDoneStorage(el) {
        doneStorage.removeChild(el);
    }

    // Ощищение всех Элементов меню Навигаци
    let allNavigationElements = [];
    for (let i = 0; i < dropMenuItems.length; i++) {
        allNavigationElements.push(dropMenuItems[i]);
    }
    allNavigationElements.forEach(clearNavigationMenu);

    function clearNavigationMenu(el) {
        dropMenu.removeChild(el);
    }

    // Запуск анимаций
    themeNameHeader.removeChild(themeNameDisplay);
    themeNameHeader.appendChild(themeNameDisplay);
    moneyWrap.removeChild(moneyDisplay);
    moneyWrap.insertBefore(moneyDisplay, moneyWrap.firstChild);

    moneyDisplay.innerHTML = moneySum;

    for (let i = 0; i < organiserStorage.length; i++) {

        let navEl = new NavigationElement();
        dropMenu.appendChild(navEl.newNavItem);
        navEl.newNavItem.innerHTML = organiserStorage[i].themeName;
        navEl.newNavItem.addEventListener("click", themeChange);

        function themeChange() {
            themeNameDisplay.innerHTML = navEl.newNavItem.innerHTML;
            windowRearange();
            storeInfo();
        }


        if (organiserStorage[i].themeName === themeNameDisplay.innerHTML) {  // Name CHAIN!!!

            for (let z = 0; z < organiserStorage[i].shortTermPlans.length; z++) {
                let elem = new PlanElement();

                elem.newTaskWrap.className = "shortTaskWrap";
                elem.taskTitle.innerHTML = organiserStorage[i].shortTermPlans[z].planName;
                elem.taskMoney.innerHTML = organiserStorage[i].shortTermPlans[z].planMoney;
                //debugger
                shortTermStorage.appendChild(elem.newTaskWrap);
                if (elem.taskMoney.innerHTML <= moneySum) {
                    elem.newTask.style.backgroundColor = "rgb(49 169 184 / 20%)"
                    elem.taskMoney.style.color = "#258039";
                    elem.taskMoney.style.fontWeight = "bold"

                }


                elem.newTask.addEventListener("click", showPlanManipulationMenuShort);

                function showPlanManipulationMenuShort() {

                    elem.newTaskWrap.appendChild(planManipulationMenu);
                    let styles = window.getComputedStyle(planManipulationMenu);
                    if (styles.display === "none") {
                        planManipulationMenu.style.display = "flex";
                    } else {
                        planManipulationMenu.style.display = "none";
                        elem.newTaskWrap.removeChild(planManipulationMenu)
                    }
                }
            }

            for (let z = 0; z < organiserStorage[i].longTermPlans.length; z++) {

                let elem = new PlanElement();
                elem.newTaskWrap.className = "longTaskWrap";
                elem.taskTitle.innerHTML = organiserStorage[i].longTermPlans[z].planName;
                elem.taskMoney.innerHTML = organiserStorage[i].longTermPlans[z].planMoney;
                longTermStorage.appendChild(elem.newTaskWrap);
                if (elem.taskMoney.innerHTML <= moneySum) {
                    elem.newTask.style.backgroundColor = "rgb(245 190 65 / 30%)"
                    elem.taskMoney.style.color = "#258039";
                    elem.taskMoney.style.fontWeight = "bold"
                }

                elem.newTask.addEventListener("click", showPlanManipulationMenuLong);

                function showPlanManipulationMenuLong() {

                    elem.newTaskWrap.appendChild(planManipulationMenu);
                    let styles = window.getComputedStyle(planManipulationMenu);
                    if (styles.display === "none") {
                        planManipulationMenu.style.display = "flex";
                    } else {
                        planManipulationMenu.style.display = "none";
                        elem.newTaskWrap.removeChild(planManipulationMenu)
                    }
                }
            }

            for (let z = 0; z < organiserStorage[i].donePlans.length; z++) {

                let elem = new PlanElement();
                elem.newTaskWrap.className = "doneTaskWrap";
                elem.taskTitle.innerHTML = organiserStorage[i].donePlans[z].planName;
                elem.taskMoney.innerHTML = organiserStorage[i].donePlans[z].planMoney;
                doneStorage.appendChild(elem.newTaskWrap);

                elem.newTask.addEventListener("click", showPlanManipulationMenuDone);

                function showPlanManipulationMenuDone() {

                    elem.newTaskWrap.appendChild(donePlanDeleteMenu);
                    let styles = window.getComputedStyle(donePlanDeleteMenu);
                    if (styles.display === "none") {
                        donePlanDeleteMenu.style.display = "flex";
                    } else {
                        donePlanDeleteMenu.style.display = "none";
                        elem.newTaskWrap.removeChild(donePlanDeleteMenu)
                    }
                }
            }
        }
    }
}


plusBtn.addEventListener("click", displayThemeMenu)     // Отображение Меню выбора названия темы
function displayThemeMenu() {
    backGr.style.display = "block";
    themeSelect.style.display = "block";


}

backGr.addEventListener("click", cancelThemeMenu)      // Скрытие всех Меню по клику на область вокруг Меню
function cancelThemeMenu() {
    backGr.style.display = "none";
    themeSelect.style.display = "none";
    shortTermSelect.style.display = "none";
    longTermSelect.style.display = "none";
    planDeleteApprove.style.display = "none";
    donePlanDeleteApprove.style.display = "none";
    savingsMenu.style.display = "none";
    themeDeleteMenu.style.display = "none";


    shortTermNameInput.value = "";
    shortTermMoneyInput.value = "";
    longTermNameInput.value = "";
    longTermMoneyInput.value = "";

    windowRearange();


}

themeMenuCancel.addEventListener("click", themeMenuCancellation)    // Отмена в Меню выбора названия темы
function themeMenuCancellation() {
    backGr.style.display = "none";
    themeSelect.style.display = "none";
    themeNameInput.value = "";
    windowRearange();
}

themeMenuOk.addEventListener("click", themeMenuApprove)           // Подтверждение Названия Темы
function themeMenuApprove() {
    if (themeNameInput.value) {
        backGr.style.display = "none";
        themeSelect.style.display = "none";
        // noTheme.style.display = "none";
        //helpTxt.style.display = "none";
        //themeWrap.style.display = "block";

        let themeElement = {themeName: null, donePlans: [], shortTermPlans: [], longTermPlans: []};
        themeElement.themeName = themeNameInput.value.toString();
        themeNameDisplay.innerHTML = themeElement.themeName;

        themeNameInput.value = "";
        organiserStorage.push(themeElement);

        windowRearange();
        storeInfo();

        console.log(themeElement);
        console.log(organiserStorage);
        console.log(dropMenuItems);

    }
}

dropBar.addEventListener("click", dropBarDisplay)

function dropBarDisplay() {
    let styles = window.getComputedStyle(dropMenu);
    if (styles.display === "none") {
        dropMenu.style.display = "block";
    } else dropMenu.style.display = "none";

}

plusBtnStorage[0].addEventListener("click", displayShortTermMenu);        // Нажатие + в Short
function displayShortTermMenu() {
    backGr.style.display = "block";
    shortTermSelect.style.display = "block";
}


shortTermOk.addEventListener("click", shortTermMenuApprove);          // Создание Short plan
function shortTermMenuApprove() {
    if (shortTermNameInput.value && !isNaN(shortTermMoneyInput.value)) {
        backGr.style.display = "none";
        shortTermSelect.style.display = "none";
        let planTemplate = {planName: null, planMoney: null};
        let planNameVariable = shortTermNameInput.value.toString();
        let planMoneyVariable = parseInt(shortTermMoneyInput.value).toString();
        planTemplate.planName = planNameVariable;
        planTemplate.planMoney = planMoneyVariable;

        for (let el of organiserStorage) {
            if (el.themeName === themeNameDisplay.innerHTML) {
                el.shortTermPlans.push(planTemplate)
            }
        }

        windowRearange();
        storeInfo();

        console.log(planTemplate);
        console.log(organiserStorage);
        console.log(organiserStorage);

        shortTermNameInput.value = "";
        shortTermMoneyInput.value = "";
    }
}

shortTermCancel.addEventListener("click", shortTermMenuCancellation);    // Отмена Создания Short plan
function shortTermMenuCancellation() {
    backGr.style.display = "none";
    shortTermSelect.style.display = "none";
    shortTermNameInput.value = "";
    shortTermMoneyInput.value = "";
    windowRearange();

}

plusBtnStorage[1].addEventListener("click", displayLongTermMenu);       // Нажатие + в Long
function displayLongTermMenu() {
    backGr.style.display = "block";
    longTermSelect.style.display = "block";
}


longTermOk.addEventListener("click", longTermMenuApprove);           // Создание Long plan
function longTermMenuApprove() {
    if (longTermNameInput.value && !isNaN(longTermMoneyInput.value)) {

        backGr.style.display = "none";
        longTermSelect.style.display = "none";
        let planTemplate = {planName: null, planMoney: null};
        let planNameVariable = longTermNameInput.value.toString();
        let planMoneyVariable = parseInt(longTermMoneyInput.value).toString();

        planTemplate.planName = planNameVariable;
        planTemplate.planMoney = planMoneyVariable;
        for (let el of organiserStorage) {
            if (el.themeName === themeNameDisplay.innerHTML) {
                el.longTermPlans.push(planTemplate)
            }
        }
        windowRearange();
        storeInfo();

        console.log(planTemplate);
        console.log(organiserStorage);

        longTermNameInput.value = "";
        longTermMoneyInput.value = "";

    }
}

longTermCancel.addEventListener("click", longTermMenuCancellation);      //  Отмена Создания Long plan
function longTermMenuCancellation() {
    backGr.style.display = "none";
    longTermSelect.style.display = "none";
    longTermNameInput.value = "";
    longTermMoneyInput.value = "";
    windowRearange();

}


donePlanBtn.addEventListener("click", moveToDone);  // Click Done в Меню элементов Short и Long
function moveToDone() {
    let currentEl = planManipulationMenu.parentNode;

    for (let i = 0; i < organiserStorage.length; i++) {

        if (organiserStorage[i].themeName === themeNameDisplay.innerHTML) {

            if (currentEl.className === "shortTaskWrap") {
                shortTermStorage.removeChild(currentEl);
                for (let z = 0; z < organiserStorage[i].shortTermPlans.length; z++) {
                    let planNameSpan = planManipulationMenu.previousSibling.firstChild;
                    let planNameMoney = planManipulationMenu.previousSibling.lastChild;

                    if (organiserStorage[i].shortTermPlans[z].planName === planNameSpan.innerHTML) {
                        organiserStorage[i].donePlans.push(organiserStorage[i].shortTermPlans.splice(z, 1)[0]);
                        if (moneySum - planNameMoney.innerHTML < 0) {
                            moneySum = 0;
                        } else {
                            moneySum -= planNameMoney.innerHTML;
                        }
                        console.log(organiserStorage);
                    }
                }
            }

            if (currentEl.className === "longTaskWrap") {
                longTermStorage.removeChild(currentEl);
                for (let z = 0; z < organiserStorage[i].longTermPlans.length; z++) {
                    let planNameSpan = planManipulationMenu.previousSibling.firstChild;
                    let planNameMoney = planManipulationMenu.previousSibling.lastChild;

                    if (organiserStorage[i].longTermPlans[z].planName === planNameSpan.innerHTML) {
                        organiserStorage[i].donePlans.push(organiserStorage[i].longTermPlans.splice(z, 1)[0]);
                        if (moneySum - planNameMoney.innerHTML < 0) {
                            moneySum = 0;
                        } else {
                            moneySum -= planNameMoney.innerHTML;
                        }

                        console.log(organiserStorage);
                    }
                }
            }
        }
    }

    windowRearange();
    storeInfo();
}

deletePlanBtn.addEventListener("click", deletePlanMenuDisplay);   // Display "Are you sure" при удалении Short и Long
function deletePlanMenuDisplay() {
    planDeleteApprove.style.display = "block";
    backGr.style.display = "block";

}


planDeleteCancel.addEventListener("click", planDeleteCancelation);  // Отмена удаления элементов Short и Long
function planDeleteCancelation() {
    backGr.style.display = "none";
    planDeleteApprove.style.display = "none";
    windowRearange();
}

planDeleteOk.addEventListener("click", planDeleteApproval);      // Удаление элемента Short и Long после подтверждения
function planDeleteApproval() {
    backGr.style.display = "none";
    planDeleteApprove.style.display = "none";
    let currentEl = planManipulationMenu.parentNode;
    for (let i = 0; i < organiserStorage.length; i++) {
        if (organiserStorage[i].themeName === themeNameDisplay.innerHTML) {
            if (currentEl.className === "shortTaskWrap") {
                for (let z = 0; z < organiserStorage[i].shortTermPlans.length; z++) {
                    let planNameSpan = planManipulationMenu.previousSibling.firstChild;
                    if (organiserStorage[i].shortTermPlans[z].planName === planNameSpan.innerHTML) {
                        organiserStorage[i].shortTermPlans.splice(z, 1);
                        console.log(organiserStorage);
                    }
                }

            }
            if (currentEl.className === "longTaskWrap") {
                for (let z = 0; z < organiserStorage[i].longTermPlans.length; z++) {
                    let planNameSpan = planManipulationMenu.previousSibling.firstChild;
                    if (organiserStorage[i].longTermPlans[z].planName === planNameSpan.innerHTML) {
                        organiserStorage[i].longTermPlans.splice(z, 1);
                        console.log(organiserStorage);
                    }
                }
            }

        }
    }
    windowRearange();
    storeInfo();
}


donePlanDeleteBtn.addEventListener("click", deleteDonePlan);   // Display "Are you sure" при удалении Done
function deleteDonePlan() {
    donePlanDeleteApprove.style.display = "block"
    backGr.style.display = "block"
}

donePlanDeleteCancel.addEventListener("click", donePlanDeleteCancelation);  // Отмена удаления элементов Done
function donePlanDeleteCancelation() {
    backGr.style.display = "none";
    donePlanDeleteApprove.style.display = "none";
    windowRearange();
}

donePlanDeleteOk.addEventListener("click", donePlanDeleteApproval);   // Удаление элемента Done после подтверждения
function donePlanDeleteApproval() {
    backGr.style.display = "none";
    donePlanDeleteApprove.style.display = "none";
    let currentEl = donePlanDeleteMenu.parentNode;

    for (let i = 0; i < organiserStorage.length; i++) {
        if (organiserStorage[i].themeName === themeNameDisplay.innerHTML) {
            if (currentEl.className === "doneTaskWrap") {
                for (let z = 0; z < organiserStorage[i].donePlans.length; z++) {
                    let planNameSpan = donePlanDeleteMenu.previousSibling.firstChild;
                    if (organiserStorage[i].donePlans[z].planName === planNameSpan.innerHTML) {
                        organiserStorage[i].donePlans.splice(0, 1);
                        console.log(organiserStorage)
                    }
                }

            }

        }
    }
    windowRearange();
    storeInfo();
}


plusBtnStorage[2].addEventListener("click", displayAddSavingsMenu);   // + Btn Add savings
function displayAddSavingsMenu() {
    backGr.style.display = "block";
    savingsMenu.style.display = "block";
}

savingsMenuCancel.addEventListener("click", savingsMenuCancellation)    // Отмена в Меню savings
function savingsMenuCancellation() {
    backGr.style.display = "none";
    savingsMenu.style.display = "none";
    savingsInput.value = "";
    windowRearange();
}

savingsMenuOk.addEventListener("click", savingsMenuApprove);     // Подтверждение Add savings
function savingsMenuApprove() {
    if (!isNaN(shortTermMoneyInput.value)) {
        backGr.style.display = "none";
        savingsMenu.style.display = "none";
        moneySum = savingsInput.value;
        moneyDisplay.innerHTML = moneySum;
        windowRearange();
        storeInfo();
        console.log(moneySum);
    }

}

deleteThemeBtn.addEventListener("click", displayDeleteThemeMenu);   // Нажатие на удаление Темы
function displayDeleteThemeMenu() {
    backGr.style.display = "block";
    themeDeleteMenu.style.display = "block";
}

themeDeleteCancel.addEventListener("click", themeDeleteMenuCancellation)    // Отмена в Меню удаления Темы
function themeDeleteMenuCancellation() {
    backGr.style.display = "none";
    themeDeleteMenu.style.display = "none";
    windowRearange();
}

themeDeleteOk.addEventListener("click", themeDeleteMenuApprove);     // Подтверждение в Меню удаления Темы
function themeDeleteMenuApprove() {
    backGr.style.display = "none";
    themeDeleteMenu.style.display = "none";

    for (let i = 0; i < organiserStorage.length; i++) {

        if (organiserStorage[i].themeName === themeNameDisplay.innerHTML) {
            organiserStorage.splice(i, 1);
            if (i === 0) {
                if (!organiserStorage[0]) {
                    themeNameDisplay.innerHTML = "";
                    // themeWrap.style.display = "none";
                    // helpTxt.style.display = "block";
                    // noTheme.style.display = "block";

                } else {
                    themeNameDisplay.innerHTML = organiserStorage[0].themeName;
                }
            } else {
                themeNameDisplay.innerHTML = organiserStorage[i - 1].themeName;
            }
            windowRearange();
            storeInfo();
        }
    }


}
