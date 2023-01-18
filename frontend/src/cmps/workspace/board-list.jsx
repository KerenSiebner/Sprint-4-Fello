import { useState } from "react";

import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ boards, onEditBoard, onRemoveBoard }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function onCloseModal() {
        setIsModalOpen(!isModalOpen)
    }

    return <section className="board-list">

        <ul>
        {<button className="board-list-btn" onClick={() => { setIsModalOpen(!isModalOpen) }}>Create new board</button>}
            {boards.map((board, index) =>
                <li
                    key={index}
                    className="board-preview-list"
                >
                    <BoardPreview
                        board={board}
                        onEditBoard={onEditBoard}
                        onRemoveBoard={onRemoveBoard}
                    />

                </li>)}
        </ul>

       
        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} />}
    </section>
}