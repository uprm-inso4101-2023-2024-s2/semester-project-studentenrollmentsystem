import React, { useState, useEffect } from "react";
import styles from "../styles/pages/studentPage.module.scss";
import Coursetable from "../components/courseTable";
import Scheduletable from "../components/scheduleTable";
import Datafall2023 from "../dummydata/fall2023.csv"
import Dataspring2024 from "../dummydata/spring2024.csv"
import officeHours from "../dummydata/profOHspring2024.csv"
import Examtable from "../components/activeExams";

export default function StudentPage() {
  var DataSet = [Datafall2023,Dataspring2024];
  var [Data,setState] = useState(Dataspring2024);
  var [currentSemester, setCurrentSemester] = useState(true);
  var [displayOH, setDisplayOH] = useState(false);

  const changeSemester = (SEMESTER) => {
    if(SEMESTER!=Data.toString(Data).slice(14,Data.toString(Data).indexOf(".")))
    {
      for(var i = 0; i<DataSet.length; i++)
      {
        if(SEMESTER==DataSet[i].toString(DataSet[i]).slice(14,DataSet[i].toString(DataSet[i]).indexOf(".")))
        {
          setState(DataSet[i]);
          setIsTable1Visible(false);
          setTimeout(setIsTable1Visible,1,true);
          setIsDropdownVisible(false);
          if(DataSet[i]!=DataSet[DataSet.length-1])
          {
            setCurrentSemester(false);
            setDisplayOH(false);
          }
          else if(DataSet[i]==DataSet[DataSet.length-1])
          {
            setCurrentSemester(true);
          }
          break;
        }
      }
    }
  };
  const [isTable1Visible, setIsTable1Visible] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [profileImage, setProfileImage] = useState("https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg");
  const [name, setName] = useState("pedro");
  const [depa, setDepa] = useState("INSO");
  const [gpa, setGpa] = useState("4.00");
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isProfileSwitchOn, setIsProfileSwitchOn] = useState(false);
  
  const [bio, setBio] = useState("Talk about you...");
  const [editedBio, setEditedBio] = useState("");
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [customLink1, setCustomLink1] = useState("");
  const [customLink2, setCustomLink2] = useState("");
  const [showAcademicCalendar, setShowAcademicCalendar] = useState(false);
  const [customButtonText, setCustomButtonText] = useState(["", ""]);

  useEffect(() => {
    const setTitleToButton = () => {
      const pageTitle = document.title;
      if (customLink1) {
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[0] = pageTitle;
          return updatedArray;
        });
      }
      if (customLink2) {
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[1] = pageTitle;
          return updatedArray;
        });
      }
    };
    setTitleToButton();
  }, [customLink1, customLink2]);

  const toggleDisplayOh = () => {
    setDisplayOH((current)=> !current);
  }

  const toggleIsTable1 = () => {
    setIsTable1Visible((current) => !current);
    setIsDropdownVisible(false); // Close the dropdown when switching tables
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((current) => !current);
  };

  const handleProfileEdit = () => {
    setIsProfileEditing(true);
  };

  const handleProfileSwitchToggle = () => {
    setIsProfileSwitchOn((prev) => !prev);
  };

  const handleBioEdit = () => {
    setIsBioEditing(true);
    setEditedBio(bio);
  };

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveBio = () => {
    setIsBioEditing(false);
    console.log("Bio saved:", bio);
  };

  const handleCancelBio = () => {
    setIsBioEditing(false);
    setBio(editedBio);
  };

  const handleCustomButtonClick = (linkState, setLinkState, index) => {
    if (linkState) {
      window.open(linkState, "_blank");
    } else {
      const link = prompt("Enter the link:");
      if (link) {
        setLinkState(link);
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[index - 1] = document.title;
          return updatedArray;
        });

        return academicCalendarData;
    };

    const addEventToCalendar = (date) => {
        const eventTitle = prompt("Enter event title:");

        if (eventTitle !== null) { // Prompt returns null if canceled
            const addTime = window.confirm("Do you want to add a time for this event?");

            if (addTime) {
                // Create a time input element
                const timeInput = document.createElement("input");
                timeInput.type = "time";
                timeInput.className = "event-time-input";

                // Create a container for the time input
                const timeContainer = document.createElement("div");
                timeContainer.className = "time-container";
                timeContainer.appendChild(timeInput);

                timeContainer.style.position = "absolute";
                timeContainer.style.left = "240px";
                timeContainer.style.bottom = "22px";

                // Create a save button
                const saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.addEventListener("click", () => {
                    const eventTime = timeInput.value;
                    if (eventTime) {
                        const formattedDate = date.toISOString().split('T')[0];
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const yearMonthKey = `${year}-${month.toString().padStart(2, "0")}`;


                        const isEventExist = academicEvents[yearMonthKey]?.[day]?.some(event => event.date === formattedDate && event.title === eventTitle && event.time === eventTime);
                        if (!isEventExist) {
                            setAcademicEvents((prevEvents) => {
                                const updatedEvents = { ...prevEvents };

                                if (updatedEvents[yearMonthKey]) {
                                    if (updatedEvents[yearMonthKey][day]) {
                                        updatedEvents[yearMonthKey][day].push({ date: formattedDate, title: eventTitle, time: eventTime });
                                    } else {
                                        updatedEvents[yearMonthKey][day] = [{ date: formattedDate, title: eventTitle, time: eventTime }];
                                    }
                                } else {
                                    updatedEvents[yearMonthKey] = { [day]: [{ date: formattedDate, title: eventTitle, time: eventTime }] };
                                }

                                return updatedEvents;
                            });

                            document.body.removeChild(dialog);

                            setSelectedEvents([{ title: eventTitle, time: eventTime }]);
                        } else {
                            alert("Event already exists for this date, time, and title.");
                        }
                    }
                });

                // Display a dialog with the time input wrapped in the container and save button
                const dialog = document.createElement("div");
                dialog.appendChild(document.createTextNode("Select event time: "));
                dialog.appendChild(timeContainer);
                dialog.appendChild(saveButton);
                dialog.appendChild(document.createElement("br"));
                dialog.appendChild(document.createTextNode("Event title: " + eventTitle));

                document.body.appendChild(dialog);

                const rect = timeContainer.getBoundingClientRect();
                const offset = 30;
                dialog.style.position = "absolute";
                dialog.style.left = rect.right + offset + "px";
                dialog.style.top = rect.bottom - offset + "px";
            } else {
                const formattedDate = date.toISOString().split('T')[0];
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const yearMonthKey = `${year}-${month.toString().padStart(2, "0")}`;

                const isEventExist = academicEvents[yearMonthKey]?.[day]?.some(event => event.date === formattedDate && event.title === eventTitle);
                if (!isEventExist) {
                    setAcademicEvents((prevEvents) => {
                        const updatedEvents = { ...prevEvents };

                        if (updatedEvents[yearMonthKey]) {
                            if (updatedEvents[yearMonthKey][day]) {
                                updatedEvents[yearMonthKey][day].push({ date: formattedDate, title: eventTitle });
                            } else {
                                updatedEvents[yearMonthKey][day] = [{ date: formattedDate, title: eventTitle }];
                            }
                        } else {
                            updatedEvents[yearMonthKey] = { [day]: [{ date: formattedDate, title: eventTitle }] };
                        }

                        return updatedEvents;
                    });

                    setSelectedEvents([{ title: eventTitle }]);
                } else {
                    alert("Event already exists for this date and title.");
                }
            }
        }
    };

    const AcademicCalendar = () => {
        const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
        const [isAddingEvent, setIsAddingEvent] = useState(false);

        const academicCalendar = generateAcademicCalendar();

        const handlePreviousMonth = () => {
            setCurrentMonthIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        };

        const handleNextMonth = () => {
            setCurrentMonthIndex((prevIndex) =>
                Math.min(prevIndex + 1, academicCalendar.length - 1)
            );
        };

        const handleAddEvent = () => {
            setIsAddingEvent(true);
        };

        const handleDayClick = (date) => {
            if (isAddingEvent) {
                addEventToCalendar(date);
                setIsAddingEvent(false);
            } else {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const yearMonthKey = `${year}-${month.toString().padStart(2, "0")}`;

                const userAddedEvents = academicEvents[yearMonthKey]?.[day] || [];
                const importantEvents = academicCalendar[currentMonthIndex].days[day - 1].events;

                const allEvents = [...userAddedEvents, ...importantEvents];

                setSelectedEvents(allEvents.map(event => ({ ...event, date, year, month, day })));
            }
        };

        return (
            <div className={styles.academicCalendar}>
                <h1>Academic Calendar - 2024</h1>
                <div className={styles.navigationButtons}>
                    <button onClick={handlePreviousMonth}>&lt; Previous Month</button>
                    <button onClick={handleNextMonth}>Next Month &gt;</button>
                </div>
                <button onClick={handleAddEvent}>Add Event</button>
                <div key={currentMonthIndex} className={styles.monthContainer}>
                    <h2>{`${academicCalendar[currentMonthIndex].month} ${academicCalendar[currentMonthIndex].year}`}</h2>
                    <div className={styles.daysContainer}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                            <div key={idx} className={styles.day}>
                                {day}
                            </div>
                        ))}
                        {academicCalendar[currentMonthIndex].days.map((day, dayIndex) => {
                            const yearMonthKey = `${academicCalendar[currentMonthIndex].year}-${(currentMonthIndex + 1).toString().padStart(2, "0")}`;
                            const importantEvents = day.events.filter(event => event.important);
                            const eventsForDay = academicEvents[yearMonthKey]?.[day.day] || day.events;
                            const hasMultipleEvents = eventsForDay.length + importantEvents.length > 1;

                            return (
                                <div key={dayIndex} className={`${styles.day} ${hasMultipleEvents ? styles.multipleEvents : ''}`} onClick={() => handleDayClick(new Date(academicCalendar[currentMonthIndex].year, currentMonthIndex, day.day))}>
                                    <span>{day.day}</span>
                                    <div className={styles.eventsContainer}>
                                        {eventsForDay.slice(0, 1).map((event, eventIndex) => (
                                            <div key={eventIndex} className={styles.event}>
                                                <span>{event.title}</span>
                                            </div>
                                        ))}
                                        {hasMultipleEvents && <div className={styles.multipleEventsIndicator}>...</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
      <div className={styles.academicCalendar}>
        <h1>Academic Calendar</h1>
        <ul>
          {dummyCalendarData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.StudentPage}>
      <label htmlFor="profile-image-upload" className={styles.newProfileIcon} onClick={() => document.getElementById('profile-image-upload').click()}>
        <img
          src={profileImage || "/default-profile-icon.png"}
          className={styles.profileIcon}
          alt="profile"
        />
      </label>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div className={styles.mainpage}>
        <div className={styles.profileside}>
          <h1>Profile</h1>
          <form>
            {isProfileSwitchOn ? (
              <>
                <label htmlFor="totalRemaining"className={styles.movedRight}>Total Remaining:</label>
                <input
                  type="text"
                  id="totalRemaining"
                  value={totalRemaining}
                  onChange={(e) => setTotalRemaining(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="totalCredits"className={styles.movedRight}>Total Credits:</label>
                <input
                  type="text"
                  id="totalCredits"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="totalCredits"className={styles.movedRight}style={{ visibility: 'hidden' }}>Total Credits:</label>
                <input
                  style={{ visibility: 'hidden' }}
                  type="text"
                  id="totalCredits"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
              </>
            ) : (
              <>
                <label htmlFor="name"className={styles.movedRight}>Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="depa"className={styles.movedRight}>Depa:</label>
                <input
                  type="text"
                  id="depa"
                  value={depa}
                  onChange={(e) => setDepa(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="gpa"className={styles.movedRight}>GPA:</label>
                <input
                  type="text"
                  id="gpa"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
              </>
            )}

            <div className={styles.switchContainer}>
              <div onClick={handleProfileSwitchToggle} className={styles.switch}>
                <span className={styles.slider} />
                <img
                    src={profileImage || "/default-profile-icon.png"}
                    className={styles.profileIcon}
                    alt="profile"
                />
            </label>
            <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            
        <div className={styles.curriculumside}>
          <h1>{"Curriculum: " + (Data.toString(Data)).charAt(14).toUpperCase() + (Data.toString(Data).slice(15,Data.toString(Data).indexOf(".")))}</h1>
          <div className={styles.viewbutton}>
            <button className={styles.buttonX} onClick={toggleDropdown}>Semester List</button>
            <button className={styles.buttonX} onClick={toggleIsTable1}>Switch Views</button>
              {isDropdownVisible && DataSet.map((data) => (
                <button className={styles.buttonX} onClick={()=>changeSemester(data.toString(data).slice(14,data.toString(data).indexOf(".")))}>{(data.toString(data)).charAt(14).toUpperCase() + (data.toString(data).slice(15,data.toString(data).indexOf(".")))}</button>
              ))}
          </div>
          {currentSemester && !isTable1Visible && <button className={styles.buttonOH} onClick={()=>toggleDisplayOh()}>Display Office Hours</button>}
          <div className={styles.tableview}>
            {isTable1Visible && <Coursetable DATA={Data}/>}
            {!isTable1Visible && <Scheduletable DATA={Data} DATAOH={officeHours} DISPLAYOH={displayOH}/>}
          </div>
          <div className={styles.examview}>
             {isTable1Visible && <h1>Exam Grades</h1>}
             {isTable1Visible && <Examtable></Examtable>}
          </div>
        </div>
      </div>
      
      <div className={styles["green-square-container"]}>
        <div className={styles["green-square"]}>
          <p className={styles["bio-title"]}>Bio</p>

          {isBioEditing ? (
            <div className={styles["green-square"]}>
              <textarea
                value={bio}
                onChange={handleChange}
                className={styles["bio-textarea"]}
              ></textarea>

              <button className={styles["save-button"]} onClick={handleSaveBio}>
                Save
              </button>
              <button className={styles["save-button"]} onClick={handleCancelBio}>
                Cancel
              </button>
            </div>

            {showAcademicCalendar && <AcademicCalendar />}

            <button
                className={`${styles["switch"]} ${styles["hover-highlight"]}`}
                onClick={() => setShowAcademicCalendar(!showAcademicCalendar)}
            >
                <img src="/switch_icon.png" alt="Switch Icon" className={styles.switchIcon} />
            </button>

            <div className={styles["button-container-left"]}>
                <button
                    className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
                    onClick={() => handleCustomButtonClick(customLink1, setCustomLink1, 1)}
                >
                    {customLink1 ? customButtonText[0] || "Custom Button 1" : "Set Custom Link 1"}
                </button>
                <button
                    className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
                    onClick={() => handleCustomButtonClick(customLink2, setCustomLink2, 2)}
                >
                    {customLink2 ? customButtonText[1] || "Custom Button 2" : "Set Custom Link 2"}
                </button>
            </div>

            {selectedEvents.length > 0 && (
                <div className={styles.eventPopOut}>
                    <div className={styles.eventPopOutContent}>
                        <span className={styles.close} onClick={() => setSelectedEvents([])}>&times;</span>
                        <h2>Events for the day</h2>
                        <ul>
                            {selectedEvents.map((event, index) => (
                                <li key={index} className={!event.time ? styles.centeredEvent : null}>
                                    <span className={event.important ? styles.centeredEvent : null}>
                                        {event.title}
                                    </span>
                                    {/* Conditionally render the dash and time */}
                                    {event.time && <span>-</span>}
                                    {event.time && <span>{event.time}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
      </div>

      {showAcademicCalendar && generateDummyAcademicCalendar()}

      <button
        className={`${styles["switch"]} ${styles["hover-highlight"]}`}
        onClick={() => setShowAcademicCalendar(!showAcademicCalendar)}
      >
        <img src="/switch_icon.png" alt="Switch Icon" className={styles.switchIcon} />
      </button>

      <div className={styles["button-container-left"]}>
        <button
          className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
          onClick={() => handleCustomButtonClick(customLink1, setCustomLink1, 1)}
        >

          {customLink1 ? customButtonText[0] || "Custom Button 1" : "Set Custom Link 1"}

        </button>
        <button
          className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
          onClick={() => handleCustomButtonClick(customLink2, setCustomLink2, 2)}
        >

          {customLink2 ? customButtonText[1] || "Custom Button 2" : "Set Custom Link 2"}
        </button>
      </div>
    </div>
  );
}