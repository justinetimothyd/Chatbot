from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionRecommendBuild(Action):
    def name(self) -> Text:
        return "action_recommend_build"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        budget = tracker.get_slot("Budget")
        builds = {
            "30000": "CPU: AMD Ryzen 5 5600G, RAM: 16GB, etc. Total: ₱30,000",
            "45000": "CPU: AMD Ryzen 5 5600X, GPU: GTX 1660, etc. Total: ₱45,000"
        }
        build_details = builds.get(str(budget), "No build available for this budget.")
        dispatcher.utter_message(text=f"Here is a PC build based on your budget: {build_details}")
        return []