//TODO: board name
//TODO: board starred
//TODO: board change status visability - SELECT
//TODO: Filter
import {GroupList} from '../../cmps/board/group/group-list.jsx'
import {BoardHeader} from './board-header'

export function BoardDetails({board}) {
  return (
    <section className="board-details-section">
      <h5>Board Details</h5>
      <BoardHeader board={board}/>
      <GroupList board={board}/>
    </section>
  )
}
