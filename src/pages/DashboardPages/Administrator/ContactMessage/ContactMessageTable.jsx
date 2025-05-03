import React from "react";

const ContactMessageTable = () => {
  return (
    <Table>
      <TableCaption>A List Of All Contact Message From Users</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Sent-At</TableHead>
          <TableHead></TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 7 }).map((_, j) => (
                <TableCell key={j}>
                  <div className="skeleton h-8 rounded w-full"></div>
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : contacts.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center font-medium text-gray-800 py-4 border-y"
            >
              No Contact Messages Available Now !!!
            </TableCell>
          </TableRow>
        ) : (
          contacts?.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact?.username}</TableCell>
              <TableCell>{contact?.email}</TableCell>
              <TableCell>{contact?.phoneNumber}</TableCell>
              <TableCell>
                {new Date(contact?.sentAt).toLocaleString()}
              </TableCell>
              <TableCell>({moment(contact?.sentAt).fromNow()})</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    {/* Truncated message */}
                    <div className="w-[380px] truncate">{contact?.message}</div>
                  </TooltipTrigger>
                  <TooltipContent className="whitespace-pre-line mr-8">
                    {/* Full message */}
                    {contact?.message}
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                    <div
                      className={
                        "bg-base-200 p-2 rounded border border-border w-fit"
                      }
                    >
                      <MoreVertical className="cursor-pointer text-gray-700" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                          setIsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Message
                      </DropdownMenuItem>

                      <MessageDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        message={contact?.message}
                      />
                    </>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://mail.google.com/mail/?view=cm&fs=1&to=${contact?.email}`,
                          "_blank"
                        )
                      }
                    >
                      <Pencil className="w-4 h-4 mr-2" /> Reply By Email
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteMessage(contact?._id)}
                      className={"cursor-pointer tracking-tight"}
                    >
                      <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                      Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ContactMessageTable;
