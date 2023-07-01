import json
import os
import jwt
from datetime import datetime

from User import User
from Session import Session

''' EXAMPLE
basic_data_store = {
    'users': [
        {
            'id': 1,
            'name': "Amith",
            '
        },
        {
            'id': 2,
            'name': "Henry",
        }
    ],
    'sessions': [
        {
            'id': 1,
            'title': "Gold Coast Trip!!!",
            'host_id': 1,
            'guest_ids': [2],
            'start_date': "05/12/23",
            'return_date': "08/12/23",
            'tags': ["beach house", "beach", "surfing"]
            'country': "Australia",
            'city': "Gold Coast"
        }
    ]
}

'''

initial_object = {
    'users' : [],
    'sessions' : []
}

class Datastore:
    '''Datastore stores all data for backend'''

    def __init__(self):
        self.__store = initial_object

    # def get(self):
    #     '''gets data from datastore'''
    #     return self.__store

    # def set(self, store):
    #     '''Adds data to datastore'''
    #     if not isinstance(store, dict):
    #         raise TypeError('store must be of type dictionary')
    #     self.__store = store

    def _sessions_to_dict(self) -> list:
        return [session._get_as_dict() for session in self.__store['sessions']]
    
    def _users_to_dict(self) -> list:
        return [user._get_as_dict() for user in self.__store['users']]

    def get_user(self, id: int) -> User:
        for user in self.__store['users']:
            if user.id == id:
                return user
        return None

    def get_session(self, id: int) -> Session:
        if len(self.__store['sessions']) == 0:
            return None
        else:
            return [sesh for sesh in self.__store['sessions'] if sesh.id == id][0]

    def get_new_user_id(self) -> int:
        return len(self.__store['users']) + 1
    
    def get_new_session_id(self) -> int:
        return len(self.__store['sessions']) + 1
        
    def _check_email_exists(self, email: str) -> bool:
        for user in self.__store['users']:
            if email == user._get_user_email():
                return True
        return False
    
    def register_user(self, user: User) -> int:
        self.__store['users'].append(user)
        return user._get_user_id()
    
    def register_session(self, session: Session):
        self.__store['sessions'].append(session)
        # return session._get_session_id()
    
    def login_user(self, email: str, password: str) -> int:
        for user in self.__store['users']:
            if user._check_email_pass_combo(email, password) is True:
                return user._get_user_id()
        return -1
    
    # def get_all_sessions(self) -> list:
    #     return [sesh for sesh in self.__store['sessions']]

    def add_guest_to_session(self, guest_id: int, session_id: int):
        for sesh in self.__store['sessions']:
            if sesh._get_session_id() == session_id:
                sesh._add_guest(guest_id)
    
    def remove_guest_from_session(self, guest_id: int, session_id: int):
        for sesh in self.__store['sessions']:
            if sesh._get_session_id() == session_id:
                sesh._add_guest(guest_id)
    
    #### PREFERENCE MATCHING ALGORITHM ####
    # an algo, that takes uses the user's preferred tags, loops thru all
    # sessions and matches the sessions that have the highest matching count
    # from their pre-existing tags to the user's current tags
    # E.g. User's tags are [beach, 3 guests, Italy], and one session's tags are
    #       [beach, Italy] and another's is [3 guests, rainforest, Colombia] and
    #       another's is [snow, Antarctica]. 
    #       Then in order, we'd return [italy_sesh, colombia_sesh]. This is cause
    #       italy_sesh has the highest tag-match-count with user's tags (3), 
    #       followed by colombia_sesh which has 1 tag-match-count. But antarctica_sesh
    #       has no matches so we don't include it at all. 
    # NOTE: if users wants to remove the matchMe() effect, then simply refresh ?????
    def sessions_tagged_to_dict(self, guest_id: int) -> list:
        tagged_sessions_and_match_count = [] # list of tuples of (dict,int)
        # get guest's preferred_tags
        user_tags = self.get_user(guest_id).preferred_tags
        # execute order-69 (the actual algo)
        for sesh in self.__store['sessions']:
            match_count = 0
            for sesh_tag in sesh._get_tags():
                if sesh_tag in user_tags:
                    match_count += 1
            if match_count > 0:
                # append as a tuple, so u can sort based on 2nd value
                tagged_sessions_and_match_count.append((sesh._get_as_dict(), match_count))
        # Sort highest to lowest on match count                             # 1st index
        sorted_tagged = sorted(tagged_sessions_and_match_count, key=lambda x: x[1], reverse=True)
        # now extract only the dict from each tuple (already ordered)
        return [session_and_count[0] for session_and_count in sorted_tagged]
            



print('Loading Datastore...')

global data_store  # pylint: disable = invalid-name, global-at-module-level
data_store = Datastore()