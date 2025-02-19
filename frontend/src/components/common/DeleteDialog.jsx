function DeleteDialog({ id, itemType, handleDelete }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box max-w-110">
                <h3 className="font-bold text-lg">Confirm Delete</h3>
                <p className="pt-4">Are you sure you want to delete this {itemType}?</p>
                <img src="/delete.svg" className="w-3/4 mx-auto" />
                <div className="modal-action mt-0">
                    <form method="dialog" className="flex gap-2">
                        <button className="btn">Cancel</button>
                        <button className="btn btn-error" onClick={handleDelete}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default DeleteDialog