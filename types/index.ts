export interface TodoResponse {
    id: string;
    todo: string;
    is_completed: boolean;
    created_at: string;
}

export type AddTodo = Omit<TodoResponse, "id" | "created_at">;

export type EditTodo = Omit<TodoResponse, "id" | "created_at">;
