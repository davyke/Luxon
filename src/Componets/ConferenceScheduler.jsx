import React, { useState, useEffect } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import "../app.css"

const Conference = () => {
  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [currentTime, setCurrentTime] = useState(DateTime.local());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.local());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const storedSessions = localStorage.getItem('conferenceSessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conferenceSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleAddSession = () => {
    const startDateTime = DateTime.fromISO(startTime);
    const durationObj = Duration.fromObject({
      hours: parseInt(duration.split(':')[0]),
      minutes: parseInt(duration.split(':')[1])
    });
    const endDateTime = startDateTime.plus(durationObj);

    const newSession = {
      id: Date.now(), // Add a unique identifier for each session
      title,
      speaker,
      startTime: startDateTime.toISO(),
      duration: durationObj.toISO(),
      endTime: endDateTime.toISO(),
    };

    setSessions([...sessions, newSession]);
    setTitle('');
    setSpeaker('');
    setStartTime('');
    setDuration('');
  };

  const getTimeInTimeZone = (dateTime, timeZone) => {
    return dateTime.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE);
  };

  const getDateInTimeZone = (dateTime, timeZone) => {
    return dateTime.setZone(timeZone).toLocaleString(DateTime.DATE_SHORT);
  };

  const removeSession = (id) => {
    const updatedSessions = sessions.filter(session => session.id !== id);
    setSessions(updatedSessions);
  };

  return (
    <div className="hero">
      <div className='clock'>
      <h1 className="header">Conference Scheduler</h1>
      <div>
        <p className="current">Current time</p>
        <h1 className="time">{currentTime.toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      </div>
      <div>
        <input type="text" className="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
      </div>
      <div>
        
        <input type="text" className="speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder='Speaker' />
      </div>
      <div>
        <input type="datetime-local" className="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <input type="text" className="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder='Duration (hh:mm)'/>
      </div>
      <button  className="submit" onClick={handleAddSession}>Add Session</button>
      </div>
      <div className='conferences'>
      <h2 className="confrence-title">Conference Sessions</h2>
      {sessions.map((session) => {
        const startDateTime = DateTime.fromISO(session.startTime);
        const endDateTime = DateTime.fromISO(session.endTime);

        const nyTime = getTimeInTimeZone(startDateTime, 'America/New_York');
        const nyDate = getDateInTimeZone(startDateTime, 'America/New_York');

        const nairobiTime = getTimeInTimeZone(startDateTime, 'Africa/Nairobi');
        const nairobiDate = getDateInTimeZone(startDateTime, 'Africa/Nairobi');

        const londonTime = getTimeInTimeZone(startDateTime, 'Europe/London');
        const londonDate = getDateInTimeZone(startDateTime, 'Europe/London');

        const sessionInterval = Interval.fromDateTimes(startDateTime, endDateTime);
        const durationFormatted = sessionInterval.toDuration().toFormat("h 'hours and' m 'minutes'");

        return (
          <div className='all'>
          <div className='single' key={session.id}>
            <h3 className='single-conference'>{session.title}</h3>
            <div className='timming'>
            <h3>Speaker: {session.speaker}</h3>
            <div className="city1">
            <p>New York</p>
            <p>{nyDate}</p>
            <p>{nyTime}</p>
            </div>
            <div className="city2">
            <p>Nairobi</p>
            <p>{nairobiDate}</p>
            <p>{nairobiTime}</p>
            </div>
            <div className='city3'>
            <p>London</p>
            <p>{londonDate}</p>
            <p>{londonTime}</p>
            </div>
            <p>Duration: {durationFormatted}</p>
            <button className="remove" onClick={() => removeSession(session.id)}>Remove Session</button>
            </div>
            {/* <hr /> */}
          </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Conference;
