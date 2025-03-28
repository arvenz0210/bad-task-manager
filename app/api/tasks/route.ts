import { NextResponse } from 'next/server';

// Bad practice: In-memory storage instead of proper database
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
];

// Bad practice: No input validation
// Bad practice: No error handling
// Bad practice: No proper HTTP status codes
export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Bad practice: No validation
  // Bad practice: No sanitization
  // Bad practice: No proper error handling
  const newTask = {
    id: tasks.length + 1,
    title: body.title,
    completed: false
  };
  
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  
  // Bad practice: No validation
  // Bad practice: No proper error handling
  // Bad practice: No proper HTTP status codes
  const task = tasks.find(t => t.id === body.id);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  
  task.completed = body.completed;
  return NextResponse.json(task);
}

// Bad practice: No DELETE method
// Bad practice: No proper error handling
// Bad practice: No proper HTTP status codes 