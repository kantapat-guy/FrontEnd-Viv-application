const now = new Date()

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2022, 7, 5),
    end: new Date(2022, 7, 6),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2022, 7, 7, 0, 0, 0),
    end: new Date(2022, 7, 10, 0, 0, 0),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2022, 7, 13, 0, 0, 0),
    end: new Date(2022, 7, 20, 0, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),

  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]