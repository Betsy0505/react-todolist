using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar la Base de Datos usando lo que pusiste en appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 2. Configurar CORS (Vital para que tu React en Vercel no sea bloqueado)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Activar Swagger y CORS
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowReact");

// ENDPOINTS 

// obtener todo
app.MapGet("/api/todos", async (AppDbContext db) => await db.Todos.ToListAsync());

// crear un task
app.MapPost("/api/todos", async (Todo todo, AppDbContext db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/api/todos/{todo.Id}", todo);
});

// actualizar (completada o editar texto)
app.MapPut("/api/todos/{id}", async (int id, Todo inputTodo, AppDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    todo.Task = inputTodo.Task;
    todo.IsCompleted = inputTodo.IsCompleted;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// eliminar 
app.MapDelete("api/todos/{id}", async (int id, AppDbContext db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.Ok(todo);
    }
    return Results.NotFound();
});

app.Run();


// MODELADO DE LA BASE DE DATOS
public class Todo
{
    public int Id { get; set; }
    public string Task { get; set; }
    public bool IsCompleted { get; set; }
}


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Todo> Todos => Set<Todo>();
}