FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["AdminDashboard.api.csproj", "./"]
RUN dotnet restore "AdminDashboard.api.csproj"

COPY . .
RUN dotnet publish "AdminDashboard.api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "AdminDashboard.api.dll"]