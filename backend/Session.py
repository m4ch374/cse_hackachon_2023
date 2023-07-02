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
        # self.tags = tags # MUST be initialised with tags (can be permanent)
        self.country = country
        self.city = city
        # self.chat_system = [] # list of lists (of len 3) = [username, u_id, msg]

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

    # def _get_chat_system(self) -> list:
    #     return self.chat_system
    
    def _get_as_dict(self, uId) -> dict:
        return {
            'id': self.id,
            'host_id': self.host_id,
            'title': self.title,
            'max_guests': self.max_guests,
            'curr_guests': len(self.guest_ids),
            'start': self.start,
            'end': self.end,
            # 'tags': self.tags,
            'country': self.country,
            'city': self.city,
            # 'chat_system': self.chat_system,
            'is_host': self.host_id == uId,
            'joined': uId in self.guest_ids
        }

    def _add_guest(self, guest_id: int):
        self.guest_ids.append(guest_id)
    
    def _remove_guest(self, guest_id: int):
        self.guest_ids.remove(guest_id)
    
    # def _send_chat(username: str, u_id: int, msg: str):
    #    # check if u_id exists inside curr session (or data_store does that instead)



    # def session_add_user(sessionId, user):
    #     database = datastore.get()
    #     session = database.getSession(sessionId)
    #     session.guests.append(user)
    #     datastore.set(database)