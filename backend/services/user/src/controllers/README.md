1. @authenticate('jwt') → triggers JWT auth
2. JWT strategy runs → token is verified
3. UserProfile is injected into the controller
4. Your custom logic checks if the user can access the resource
5. Controller method executes business logic or throws error
