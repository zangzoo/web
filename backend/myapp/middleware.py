# middleware.py

from django.conf import settings
from django.contrib.auth import logout
from django.utils import timezone
import datetime


class AutoLogout:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            now = timezone.now()
            last_activity = request.session.get('last_activity')

            if last_activity:
                last_activity_time = datetime.datetime.fromtimestamp(last_activity, tz=datetime.timezone.utc)
                if (now - last_activity_time).total_seconds() > settings.SESSION_COOKIE_AGE:
                    logout(request)
                    del request.session['last_activity']
            request.session['last_activity'] = now.timestamp()

        response = self.get_response(request)
        return response
