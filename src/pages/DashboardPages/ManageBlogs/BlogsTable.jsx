{/* <Table>
  <TableCaption>A List of All Blogs</TableCaption>
  <TableHeader>
    <TableRow className="bg-base-200 hover:bg-base-200">
      <TableHead className="w-12">#</TableHead>
      <TableHead>Image</TableHead>
      <TableHead className="">Title</TableHead>
      <TableHead>Tag</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {isLoading ? (
      Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 8 }).map((_, j) => (
            <TableCell key={j}>
              <div className="skeleton h-8 rounded w-full"></div>
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : blogs.length > 0 ? (
      blogs.map((blog, i) => (
        <TableRow key={blog._id}>
          <TableCell className="font-medium">{i + 1}</TableCell>
          <TableCell>
            <img
              src={blog.image}
              alt={blog.title}
              className=" w-8 h-8 lg:w-12 lg:h-12 object-cover rounded-full"
            />
          </TableCell>
          <TableCell>{blog.title}</TableCell>
          <TableCell>{blog.tag}</TableCell>
          <TableCell>
            {blog.description.length > 50
              ? `${blog.description.slice(0, 50)}...`
              : blog.description}
          </TableCell>
          <TableCell>{blog.author}</TableCell>
          <TableCell>{blog.date}</TableCell>
          <TableCell>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                  <MoreVertical className="cursor-pointer text-gray-700" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleEdit(blog)}
                >
                  <Pencil className="w-4 h-4 mr-2" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleDelete(blog._id)}
                >
                  <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={7} className="text-center">
          No blogs available
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>; */}
