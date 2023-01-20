import { utilService } from '../util.service'
import { storageService } from '../connection/async-storage.service'
import imgUrlMember1 from '../../assets/img/members/member1.png'
import imgUrlMember2 from '../../assets/img/members/member2.png'
import imgUrlMember3 from '../../assets/img/members/member3.jpg'

const pageSize = 5
const BOARD_KEY = 'boardDB'

_createBoards()

export const boardService = {
  query,
  get,
  remove,
  save,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getDefaultFilter,
  getDefaultSort,
  // getRandomBoard,
  getDemoGroups,
  getImages,
  getColors
}

function query() {
  return Promise.resolve(storageService.query(BOARD_KEY))
  // function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  //   console.log(filterBy)
  // return storageService.query(BOARD_KEY)
  //      .then((boards) => {
  //     let filteredBoards = boards
  //     if (filterBy.name) {
  //       const regex = new RegExp(filterBy.name, 'i')
  //       filteredBoards = filteredBoards.filter((board) => regex.test(board.name))
  //     }
  //     if (sortBy.name > 0) {
  //       filteredBoards = filteredBoards.sort((a, b) =>
  //         a.name.localeCompare(b.name)
  //       )
  //     }
  //     if (sortBy.name < 0) {
  //       filteredBoards = filteredBoards.sort((a, b) =>
  //         a.name.localeCompare(b.name)
  //       )
  //     }
  //     // Paging
  //     // const totalPages = Math.ceil(boards.length / pageSize)
  //     if (filterBy.pageIdx !== undefined) {
  //       const startIdx = filterBy.pageIdx * pageSize
  //       filteredBoards = filteredBoards.slice(startIdx, pageSize + startIdx)
  //     }
  // })
  // return Promise.resolve(filteredBoards)
}

function get(boardId) {
  return storageService.get(BOARD_KEY, boardId)
}

function remove(boardId) {
  return storageService.remove(BOARD_KEY, boardId)
}

function save(board) {
  if (board._id) {
    console.log('board', board)
    return storageService.put(BOARD_KEY, board)
  } else {
    board._id = utilService.makeId()
    return storageService.post(BOARD_KEY, board)
  }
}

// function _createBoard() {
//   const board = {
//     "title": "Robot dev proj",
//     "createdAt": 1589983468418,

//   }
//   board._id = utilService.makeId()
//   console.log('Board Created:', board)
//   return board
// }

function getEmptyBoard() {
  return {
    // _id: utilService.makeId(),
    title: '',
    createdAt: Date.now(),
    isStarred: false,
    style: {
      bgColor: '#0079bf',
      backgroundImg: '',
    },
    groups: [],
  }
}

function getEmptyGroup(groupTitle) {
  return {
    id: utilService.makeId(),
    title: groupTitle,
    archivedAt: Date.now(),
    tasks: [],
    style: {},
  }
}

function getEmptyTask(taskTitle) {
  return {
    id: utilService.makeId(),
    title: taskTitle,
    archivedAt: Date.now(),
    style: {},
    priority: 'low',
    description: '',
    comments: [],
    checklists: [],
    memberIds: [],
    labelIds: [],
    dueDate: null,
    byMember: {},
    style: {},
  }
}


function getDefaultFilter() {
  return { name: '', price: '', pageIdx: '' }
}

function getDefaultSort() {
  return { name: '' }
}

// function getRandomBoard() {
//   const board = getEmptyBoard()
//   board.name = 'Random ' + utilService.getRandomIntInclusive(4000, 8000)
//   board.price = utilService.getRandomIntInclusive(1, 500)
//   board.labels = labels
//   board.createdAt = Date.now()
//   board.inStock = utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false
//   return board
// }

function _createBoards() {
  let boards = utilService.loadFromStorage(BOARD_KEY)
  if (!boards || !boards.length) {
    const boards = [
      _createBoard('Robot Board'),
      _createBoard('Alien Board'),
      _createBoard('Cat Board'),
      _createBoard('Dog Board'),
    ]
    utilService.saveToStorage(BOARD_KEY, boards)
  }
}

function _createBoard(title) {
  return {
    _id: 'b' + utilService.getRandomIntInclusive(100, 900),
    title,
    isStarred: utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false,
    archivedAt: Date.now(),
    createdBy: {
      _id: 'u103',
      fullname: 'Keren Siebner',
      imgUrl: { imgUrlMember3 },
    },
    style: {
      bgColor: '#ff0000',
      backgroundImg:
        'https://images.unsplash.com/photo-1673768501816-6a565f620309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#fffc60',
      },
      {
        id: 'l103',
        title: 'To Do!',
        color: '#5d2c80',
      },
      {
        id: 'l104',
        title: 'Later',
        color: '#9e0150',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Yael Tal',
        imgUrl: `${imgUrlMember1}`,
      },
      {
        _id: 'u102',
        fullname: 'Sidney Sebban',
        imgUrl: `${imgUrlMember2}`,
      },
      {
        _id: 'u103',
        fullname: 'Keren Siebner',
        imgUrl: `${imgUrlMember3}`,
      },
    ],
    groups: _createGroups(),
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: { imgUrlMember2 },
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  }
}

function _createGroups() {
  return [
    _createGroup('Group 1'),
    _createGroup('Group 2'),
    _createGroup('Group 3'),
    // _createGroup('Group 4'),
  ]
}

function _createGroup(title) {
  return {
    id: 'g' + utilService.getRandomIntInclusive(100, 900),
    title,
    archivedAt: 1589983468418,
    tasks: _createTasks(),
    style: {},
  }
}

function _createTasks() {
  return [
    _createTask(utilService.makeLorem(6)),
    _createTask(utilService.makeLorem(8)),
    _createTask(utilService.makeLorem(4)),
    // _createTask(utilService.makeLorem(10)),
  ]
}

function _createTask(title) {
  return {
    id: 'c' + utilService.getRandomIntInclusive(100, 900),
    title,
    priority: 'high',
    description: 'description',
    comments: [
      {
        id: 'ZdPnm',
        txt: 'also @yaronb please CR this',
        createdAt: 1590999817436,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: { imgUrlMember2 },
        },
      },
    ],
    checklists: [
      {
        id: 'YEhmF',
        title: 'Checklist',
        todos: [
          {
            id: '212jX',
            title: 'To Do 1',
            isDone: false,
          },
        ],
      },
    ],
    memberIds:
      utilService.getRandomIntInclusive(1, 4) <= 2
        ? ['u101', 'u102', 'u103']
        : [],
    labelIds:
      utilService.getRandomIntInclusive(1, 4) <= 2
        ? ['l101', 'l102', 'l103', 'l104']
        : [],
    dueDate: 16156215211,
    byMember: {
      _id: 'u101',
      username: 'Tal123',
      fullname: 'Yael Tal',
      imgUrl: { imgUrlMember1 },
    },
    style: {
      bgColor:
        utilService.getRandomIntInclusive(1, 4) <= 2
          ? utilService.getRandomColor()
          : '',
    },
  }
}

function getDemoGroups() {
  return [
    {
      id: 'g101',
      title: 'To do',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Replace logo',
        },
        {
          id: 'c102',
          title: 'Add Samples',
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Done',
      tasks: [
        {
          id: 'c103',
          title: 'Do that',
          archivedAt: 1589983468418,
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress',
          description: 'I am a description..',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Yael Tal',
                imgUrl: { imgUrlMember1 },
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal123',
            fullname: 'Yael Tal',
            imgUrl: { imgUrlMember1 },
          },
          style: {
            bgColor: '#26de81',
          },
        },
      ],
      style: {},
    },
  ]
}

function getImages(){
  return [
    'https://images.unsplash.com/photo-1671894618012-b1f9d305a97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    'https://images.unsplash.com/photo-1673768501816-6a565f620309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1673605124954-132c332de83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    // 'https://images.unsplash.com/photo-1673660199123-b793cdee4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1539807134273-f97ed182b488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2115&q=80',
    // 'https://images.unsplash.com/photo-1673715852601-987ac8f3b9ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  ]
  
}

function getColors(){
  return [
    '#5ba4cf',
    '#f5dd29',
    '#7bc86c',
    '#ef7564',
    '#cd8de5'
  ]
}
