# Session

class Session:
    def __init__(self, session_id: int, host_id: int, title: str, max_guests: int, start: str, end: str, country: str, city: str):
        self.id = session_id
        self.host_id = host_id
        self.title = title
        self.max_guests = max_guests
        self.guest_ids = []
        self.start = start
        self.end = end
        # self.tags = tags
        self.country = country
        self.city = city

    def _get_session_id(self) -> int:
        return self.id

    def _get_host_id(self) -> int:
        return self.host_id
    
    def _get_max_guests(self) -> int:
        return self.max_guests
    
    def _get_guest_ids(self) -> list:
        return self.guest_ids
    
    def _get_start_date(self) -> str:
        return self.start
    
    def _get_end_date(self) -> str:
        return self.end
    
    # def _get_tags(self) -> list:
    #     return self.tags

    def _add_guest(self, guest_id: int):
        self.guest_ids.append(guest_id)
    
    def _remove_guest(self, guest_id: int):
        self.guest_ids.remove(guest_id)



    # def session_add_user(sessionId, user):
    #     database = datastore.get()
    #     session = database.getSession(sessionId)
    #     session.guests.append(user)
    #     datastore.set(database)