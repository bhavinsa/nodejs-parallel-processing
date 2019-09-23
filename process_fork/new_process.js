async function task(taskId) {
  console.log(taskId);
  return `Task with #id ${taskId} is done.`;
}
process.on("message", async message => {
  console.log(message);
  message.forEach(async element => {
    process.send(await task(element));
  });
});
