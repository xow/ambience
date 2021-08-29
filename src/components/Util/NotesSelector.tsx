interface INoteButtonProps {
  noteInterval: number;
  value: boolean;
  onChange: ({ key, value }: { key: number; value: boolean }) => void;
}

function NoteButton({ noteInterval, value, onChange }: INoteButtonProps) {
  return (
    <span
      className={`border w-6 h-6 m-0.5 leading-6 text-center text-xs whitespace-nowrap cursor-pointer rounded-md shadow-sm ${
        value ? 'bg-green-500 text-white' : 'text-gray-400'
      }`}
      onClick={() => onChange({ key: noteInterval, value: !value })}
    >
      {noteInterval}
    </span>
  );
}

interface IProps {
  label: string;
  notes: number[];
  onChange: (value: number[]) => void;
}

function NotesSelector({ label, notes, onChange }: IProps) {
  const isOnByNote = notes.reduce<Record<number, boolean>>(
    (carry, note) => ({ ...carry, [note]: true }),
    {},
  );

  const noteOptions = Array.from(new Array(25), (x, i) => i - 12);
  return (
    <div>
      <label className="font-semibold text-gray-600 mb-2">{label}</label>
      <div className="mt-2 flex flex-wrap">
        {noteOptions.map(note => (
          <NoteButton
            key={note}
            noteInterval={note}
            value={isOnByNote[note]}
            onChange={keyValuePair => {
              const newIsOnByNotes = {
                ...isOnByNote,
                [note]: keyValuePair.value,
              };
              const newNotes = Object.entries(newIsOnByNotes)
                // Filter out anything false
                .filter(([, value]) => value)
                // Convert map of notes to bool to just the notes in an array
                .reduce<number[]>(
                  (carry, [key]) => [...carry, parseInt(key, 10)],
                  [],
                );
              onChange(newNotes);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesSelector;
