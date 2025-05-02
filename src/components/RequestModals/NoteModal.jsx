import {
  BadgePlus,
  CalendarDays,
  CircleUser,
  CopyX,
  Mail,
  NotebookPen,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const NoteModal = ({ form2, noteModal, onSubmit }) => {
  return (
    <dialog id="note_modal_01" className="modal modal-middle">
      {noteModal && (
        <div className="w-full flex justify-center items-center">
          <div className="modal-box">
            <div className="flex flex-col">
              {/* Heading Of The Modal */}
              <h2 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                <NotebookPen className="text-3xl text-gray-800" />
                <span>Add Note For Doctor</span>
              </h2>
              <p className="text-gray-600 text-base ml-8 font-medium whitespace-pre-line">
                This note will send to the doctor
              </p>
            </div>
            <div className="divider"></div>

            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <figure className="w-44 h-44 mx-auto mt-3">
                  <img
                    className="w-full h-full border-4 border-muted overflow-hidden rounded-full object-cover"
                    src={noteModal?.userPhoto}
                    alt={noteModal?.userName}
                  />
                </figure>

                <div className="divider"></div>

                <div className="w-full space-y-3">
                  <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                    User Name: <CircleUser className="w-5 h-5" />
                    <span className="text-gray-700 font-semibold">
                      {noteModal?.userName}
                    </span>
                  </h4>

                  <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                    User Email: <Mail className="w-4 h-4" />
                    <span className="text-gray-700 font-semibold">
                      {noteModal?.userEmail}
                    </span>
                  </h4>

                  <h4 className="flex gap-1 items-center text-lg text-gray-900 font-bold">
                    Request Date: <CalendarDays className="w-4 h-4" />
                    <span className="text-gray-700 font-semibold">
                      {new Date(noteModal?.requestDate).toLocaleDateString(
                        "en-UK"
                      )}
                    </span>
                  </h4>

                  <FormField
                    control={form2.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="w-11/12">
                        <FormLabel className="text-lg font-bold">
                          Note:
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write brief note for doctor"
                            className="resize-none h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can <span>Add</span> note with mention the doctor
                          name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="py-3 flex md:flex-row flex-col flex-wrap justify-between items-center">
                    <Button
                      type="button"
                      onClick={() =>
                        document.getElementById("note_modal_01").close()
                      }
                      className="md:px-14 px-10 btn bg-rose-500 text-base text-white font-bold rounded-md flex gap-2 items-center"
                    >
                      <CopyX className="w-4 h-4" />
                      <span>Close</span>
                    </Button>

                    <Button
                      type="submit"
                      className="md:px-14 px-10 btn bg-blue-500 text-base text-white font-bold rounded-md flex gap-2 items-center"
                    >
                      <BadgePlus className="w-6 h-6" />
                      <span>Add Note</span>
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default NoteModal;
