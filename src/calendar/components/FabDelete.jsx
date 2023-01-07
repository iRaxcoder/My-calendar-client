import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleClickDelete = async () => {
    await startDeletingEvent();
  };

  return (
    <button
      onClick={handleClickDelete}
      style={{
        display: hasEventSelected && !!isDateModalOpen ? "block" : "none",
      }}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
